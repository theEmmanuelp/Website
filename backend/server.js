import express from 'express';
const app = express();
import fs, { read } from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import cors from 'cors';
import sql from 'mssql';
import bodyParser from 'body-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
if ('OPTIONS' == req.method) {
     res.send(200);
 } else {
     next();
 }
});

app.set("trust proxy", 1);


app.use( bodyParser.urlencoded({ extended: true }) );
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbconfig = {
  server: 'localhost',
  user: 'sodv2201',
  password: '12345',
  database: 'Bow_valley_D2l',
  options:{
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(dbconfig);
const poolConnect = pool.connect();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

// student authentication
passport.use('student',
  new LocalStrategy(async (email, password, done) => {
	  
    try {
      await poolConnect;
      const request = pool.request();
      request.input('email', email);

      const result = await request.query('SELECT * FROM StudentInfo WHERE Student_Email = @email');
	  
      if (result.recordset.length === 0) {
        return done(null, false, { message: 'Incorrect email' });
      }
      const user = result.recordset[0];
	  user.Type = 'student';
	  
	  if(password != user.Student_Password){
		  return done(null, false, { message: 'Incorrect password' });
	  }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// admin authentication
passport.use('admin',
  new LocalStrategy(async (id, password, done) => {
    try {
      await poolConnect;
      const request = pool.request();
      request.input('id', id);

      const result = await request.query('SELECT * FROM AdminInfo WHERE AdminID = @id');

      if (result.recordset.length === 0) {
        return done(null, false, { message: 'Incorrect ID or password' });
      }

      const user = result.recordset[0];
	  user.Type = 'admin';
	  
	  if(password != user.AdminPassword){
		  return done(null, false, { message: 'Incorrect ID or password' });
	  }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// user serialization and deserialization

/* passport.serializeUser((user, done) => {
	if(user.Type == 'student'){
		 console.log(user);
		done(null, user.StudentID);
	}else if(user.Type == 'admin'){
		console.log(user);
		done(null, user.AdminID);
	}
  
}); */

passport.serializeUser(function(user, done) {
	console.log("serializing");
	console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log("deserializing");
	console.log(user);
  done(null, user);
}); 

/* passport.deserializeUser(async (ID, done) => {
  try {
	  //console.log(req.user);
    const request = pool.request();
	//request.input('id', ID);
	const result = await request.query(`SELECT * FROM StudentInfo WHERE StudentID = ${ID}`);
	//console.log(result.recordset[0]);
	if (result.recordset.length != 0) {
			return done(null, result.recordset[0]);
	}

    else if (result.recordset.length === 0) {
		//request.input('id', ID);
		result = await request.query(`SELECT * FROM AdminInfo WHERE AdminID = ${ID}`);
		//console.log(result.recordset[0]);
		if (result.recordset.length != 0) {
			return done(null, result.recordset[0]);
		}
    }else{
		return done('User not found', null);
	}

    //return done(null, result.recordset[0]);
    
  } catch (err) {
    return done(err);
  } finally {
	  await sql.close();
  }
}); */

// get all courses

app.get('/getCourseData', async (req, res) => {
  try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`select * from Course_table`);
	//console.log(result.recordset);

    // Respond with success
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// admin functions

// admin login
app.post('/admin/login', (req, res, next) => {
  passport.authenticate('admin', (err, user, info) => {
	  console.log("admin logging in");
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!user) {
      // Authentication failed
      return res.status(401).json({ success: false, message: 'Incorrect ID or password' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      // Authentication successful
	  console.log("logging in as admin");
      res.status(200).json({user: user});
    });
  })(req, res, next);
});


// add course
app.post('/admin/course/add', async (req, res) => {
  try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();
	
    // Insert data into the table
    const result = await request.query(`
      insert into Course_table
	  values(
	  ${req.body.Course_Code},
	  '${req.body.Course_Name}',
	  '${req.body.Course_Info}',
	  ${req.body.Term},
	  ${req.body.Diploma_Code}
	  )
    `);

    // Respond with success
    res.status(200).json({ message: 'New course created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update course
app.put('/admin/course/update', async (req, res) => {
  try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request
	.query(`
      update Course_table
	  set 
	  Course_Name = '${req.body.Course_Name}',
	  Course_Info = '${req.body.Course_Info}',
	  Term = ${req.body.Term},
	  Diploma_Code = ${req.body.Diploma_Code}
	  where Course_Code = ${req.body.Course_Code}
    `);

    // Respond with success
    res.status(200).json({ message: `Course with code ${req.body.Course_Code} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete course
app.delete('/admin/course/delete', async (req, res) => {
  try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request
	.query(`
      delete from Course_table
	  where Course_Code = ${req.body.Course_Code}
    `);

    // Respond with success
    res.status(200).json({ message: `Deleted course with code ${req.body.Course_Code} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get feedback data
app.get('/admin/getfeedbackdata', async(req,res) => {
	try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`
        select Student_ID, Student_First_Name, Student_Last_Name, Feedback from Student_FeedBack sf
		join StudentInfo si on si.StudentID = sf.Student_ID
    `);

    // Respond with success
    res.status(200).send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// student functions

//student login
app.post('/student/login', (req, res, next) => {
  passport.authenticate('student', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!user) {
      // Authentication failed
	  console.log(info);
      return res.status(401).json({ success: false, message: 'Incorrect Email or password' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      // Authentication successful
	  console.log("logging in as student");
      res.status(200).json({user: user});
    });
  })(req, res, next);
});

// student registration
app.post('/student/register', async (req, res) => {
  try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`
      insert into StudentInfo
	  values(
	  ${req.body.StudentID},
	  '${req.body.Student_First_Name}',
	  '${req.body.Student_Last_Name}',
	  '${req.body.Student_Email}',
	  '${req.body.Student_Password}',
	  '${req.body.Student_Phone}'
	  )
    `);

    // Respond with success
    res.status(200).json({ message: 'New student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// student course registration
app.post('/student/addcourse', async(req,res) => {
	try {
    // Use the connection pool to acquire a connection
    await poolConnect;
	const countRequest = pool.request();
    const request = pool.request();
	
	// check for how many courses the student has already registered for
	const courseCount = await countRequest.query(`
	select count(Student_ID) as 'count' from Student_Registered_Course
	where Student_ID = ${req.body.StudentID}
	`);
	
	// does the user not already have 5 courses registered?
	if(courseCount.recordset[0].count < 5){

    // register for the specified course
    const result = await request.query(`
      insert into Student_Registered_Course
	  values(
	  ${req.body.CourseCode},
	  ${req.body.StudentID}
	  )
    `);

    // Respond with success
    res.status(200).json({ message: 'Course registered successfully' });
	}
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// student course unregistration
app.post('/student/deletecourse', async (req, res) => {
	try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`
      delete from Student_Registered_Course
	  where Course_Code = ${req.body.CourseCode} and Student_ID = ${req.body.StudentID}
    `);

    // Respond with success
    res.status(200).json({ message: 'Course removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get registered courses for a student
app.post('/student/getregisteredcourses', async(req,res) => {
	try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`
      select s.Course_Code, ct.Course_Name from Student_Registered_Course s
	  join Course_table ct on s.Course_Code = ct.Course_Code
	  where Student_ID = ${req.body.StudentID}
    `);

    // Respond with success
    res.status(200).send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// submit feedback
app.post('/student/sendfeedback', async (req, res) => {
	try {
    // Use the connection pool to acquire a connection
    await poolConnect;
    const request = pool.request();

    // Insert data into the table
    const result = await request.query(`
      insert into Student_Feedback
	  values(${req.body.StudentID}, '${req.body.Feedback}'
	  )
    `);

    // Respond with success
    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// logout the user
app.get("/logout", (req,res) => {
   req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3000/DisplayCourses');
  });
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const server = app.listen(5000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is running at http://${host}:${port}`);
});

//student login
//this page should be the first thing seen
import React from "react";
import "../css/LoginBox.css";

const Student_Login = () => {
  return (
    <div className="LoginBox">
      <h1>BVC Login</h1>
      <form action="/studentlogin" method="post">
        <input
          type="email"
          name="email"
          placeholder="Student ID"
          required
        ></input>
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
        ></input>{" "}
        <br></br>
        <input type="submit" value="login"></input>
      </form>
    </div>
  );
};

export default Student_Login;

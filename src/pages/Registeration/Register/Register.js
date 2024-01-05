import React from "react";
import { useState, useEffect } from "react";
import "../Registeration.scss";
import { useNavigate } from "react-router-dom";
import { SignupLogin } from "../../../Api/Api";

function Register() {
  const initialState = {
    email: "",
    name: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormerror] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);
  const [commingError, setCommingError] = useState("");
  const [btntext , setbtnText] = useState("Submit")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormerror(validate({ ...formData, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnText("submitting.....");
    setisSubmit(true);
  
    try {
      const res = await SignupLogin("/Auth/signup", formData);
      console.log(res);
      if (res.status === 200) {
        setbtnText("submitted");
        navigate("/login");
      } else {
        setbtnText("some error");
        setCommingError("signup failed");
      }
    } catch (error) {
      setCommingError(error.response.data);
    }
  };
  

  const validate = (value) => {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;

    const alphabet = /^[A-Za-z]+$/;
    if (!value.email) {
      error.email = "email.required";
    } else if (!regex.test(value.email)) {
      error.email = "this is not a valid format";
    } else if (!value.name) {
      error.name = "name is required";
    } else if (value.name.length > 20) {
      error.name = "name always less than 20";
    } else if (!alphabet.test(value.name)) {
      error.name = "only alphabet are allowed";
    } else if (!value.password) {
      error.password = "password is required";
    } else if (!passwordRegex.test(value.password)) {
      error.password = "min-len of 8 char and atleast one letter";
    }
    return error;
  };

  return (
    <div className="registeration">
      <div className="main">
        <section className="formContainer">
          <h1>Milan</h1>
          <p> Sign up to see photos from your friends</p>
          <p className="line"></p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formError.email && (
              <p className="error" aria-live="polite">
                {formError.email}
              </p>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {formError.name && (
              <p className="error" aria-live="polite">
                {formError.name}
              </p>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formError.password && (
              <p className="error" aria-live="polite">
                {formError.password}
              </p>
            )}
            {commingError && <p style={{color:"red"}} >{commingError}</p>}
            <button>{btntext}</button>
          </form>
          <p className="line"></p>
          <p className="account">
            have an account{" "}
            <span className="switch" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Register;

import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Registeration.scss";
function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const [formError, setformError] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    setformError(validate({ ...formData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setisSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      navigate("/home");
    }
  });

  const validate = (value) => {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;
    if (!value.email) {
      error.email = "email.required";
    } else if (!regex.test(value.email)) {
      error.email = "this is not a valid format";
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
          <h1>Login</h1>
          <p className="line"></p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
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
            <button>Submit</button>
          </form>
          <p className="line"></p>
        <p className="account" >
          have an account <span className="switch" onClick={()=>navigate("/register")} >  Register</span>
        </p>
        </section>
     
      </div>
    </div>
  );
}

export default Login;

import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import "./Registration.css";
import { getCharacterValidationError } from "../Shared/helper";
import { RegistrationType } from "../Types/User.type";


export const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const saveUserDetails = (values: RegistrationType) => {
    const hashedPassword = bcrypt.hashSync(
      values.password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    ); // hash created previously created upon sign up

    const updatedUserDetails = {
      ...values,
      password: hashedPassword,
    };

    localStorage.setItem("UserDetails", JSON.stringify(updatedUserDetails));
  };

  return (
    <div className="container">
      <div className="background-image" />
      <div className="wrapper">
        <Formik
          initialValues={initialValues}
          onSubmit={saveUserDetails}
          validationSchema={Yup.object({
            email: Yup.string()
              .email()
              .required("Email is Required")
              .matches(/^(?!.*@[^,]*,)/),
            password: Yup.string()
              .required("Password is Required")
              // check minimum characters
              .min(8, "Password must have at least 8 characters")
              // different error messages for different requirements
              .matches(/[0-9]/, getCharacterValidationError("digit"))
              .matches(/[a-z]/, getCharacterValidationError("lowercase"))
              .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
            firstName: Yup.string().required("First Name is Required"),
            lastName: Yup.string().required("Last Name is Required"),
          })}
        >
          <Form>
            <h2>Registration</h2>

            <div className="input-box">
              <Field type="text" placeholder="First Name" name="firstName" />
            </div>
            <ErrorMessage name="firstName" component="div" className="error" />

            <div className="input-box">
              <Field type="text" placeholder="Last Name" name="lastName" />
            </div>
            <ErrorMessage name="lastName" component="div" className="error" />

            <div className="input-box">
              <Field type="text" placeholder="Email" name="email" />
              <PersonRoundedIcon fontSize="medium" className="icon" />
            </div>

            <ErrorMessage name="email" component="div" className="error" />

            <div className="input-box">
              <Field
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <div onClick={() => setShowPassword((prev) => !prev)}>
                <LockRoundedIcon
                  fontSize="medium"
                  className="icon visible-password"
                />
              </div>
            </div>
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Register</button>

            <div className="registration-link">
              <p className="registration-message">Existing User</p>
              <NavLink to="/login">Login</NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

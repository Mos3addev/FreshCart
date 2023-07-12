import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const [loading, setLoading] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [sendEmail, setIsSendEmail] = useState(false);
  const [resetCode, setIsResetCode] = useState(false);
  const [resetPassword, setIsResetPassword] = useState(false);
  let { logOut } = useContext(AuthContext);

  const SendEmail = () => {
    setIsSendEmail(!sendEmail);
  };

  const ResetCode = () => {
    setIsResetCode(!resetCode);
  };

  const ResetPassword = () => {
    setIsResetPassword(!resetPassword);
  };

  let navigate = useNavigate();
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let EditFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(15).required(),
      email: Yup.string().email().required(),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/users/updateMe/`, values, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((data) => {
          if (data.status === 201) {
            setLoading(false);
            notify("Success", "success");
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error) {
            setLoading(false);
            notify(error.response.data.errors.msg, "error");
          }
        });
    },
  });

  let SendEmailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/forgotPasswords`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);

            notify(data.data.message, "success");
            SendEmail();
            ResetCode();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  let ResetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .matches(/^[0-9]{6}$/)
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/verifyResetCode`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);

            notify(data.data.status, "success");
            ResetCode();
            ResetPassword();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  let ResetPasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9@#$%]{5,}$/,
          "The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%."
        )
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/auth/resetPassword`, values)
        .then((data) => {
          if (data.status === 200) {
            localStorage.removeItem("token")
            .then(localStorage.setItem("token", data.data.token));
            setLoading(false);

            notify("Password Rested Succeeded", "success");
            ResetPassword();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  let PasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9@#$%]{5,}$/,
          "The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%."
        )
        .required(),
      password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9@#$%]{5,}$/,
          "The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%."
        )
        .required(),
      rePassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Please enter the same password in both fields."
        )
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoadingPass(true);
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/users/changeMyPassword`,
          values,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            setLoadingPass(false);
            logOut();
            navigate("/login");
            notify("Success", "success");
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error) {
            setLoadingPass(false);
            notify(error.response.data.errors.msg, "error");
          }
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="ps-5">
      <h3 className="fw-bolder py-2">Account Setting</h3>
      <form className="w-75" onSubmit={EditFormik.handleSubmit}>
        <h4 className="fw-medium">Account details</h4>
        <label className="text-main py-2">Name</label>
        <input
          onBlur={EditFormik.handleBlur}
          onChange={EditFormik.handleChange}
          value={EditFormik.values.name}
          type="text"
          id="name"
          name="name"
          className="w-50 form-control text-muted"
        />
        {EditFormik.errors.name && EditFormik.touched.name ? (
          <div className="alert w-50 alert-danger my-2">
            {EditFormik.errors.name}
          </div>
        ) : (
          ""
        )}

        <label className="text-main py-2">Email</label>
        <input
          onBlur={EditFormik.handleBlur}
          onChange={EditFormik.handleChange}
          value={EditFormik.values.email}
          type="email"
          id="email"
          name="email"
          className="w-50 form-control text-muted"
        />
        {EditFormik.errors.email && EditFormik.touched.email ? (
          <div className="alert w-50 alert-danger my-2">
            {EditFormik.errors.email}
          </div>
        ) : (
          ""
        )}

        <label className="text-main py-2">Phone</label>
        <input
          onBlur={EditFormik.handleBlur}
          onChange={EditFormik.handleChange}
          value={EditFormik.values.phone}
          type="text"
          id="phone"
          name="phone"
          className="w-50 form-control text-muted"
        />
        {EditFormik.errors.phone && EditFormik.touched.phone ? (
          <div className="alert w-50 alert-danger my-2">
            {EditFormik.errors.phone}
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={!(EditFormik.isValid && EditFormik.dirty && !loading)}
          className="btn my-3 bg-main text-white fw-bold"
        >
          {!loading ? (
            "Save Details"
          ) : (
            <i className="fas fa-spinner fa-spin"></i>
          )}
        </button>
      </form>
      <div className="border-footer my-2"></div>
      <form className="w-75" onSubmit={PasswordFormik.handleSubmit}>
        <h4 className="fw-medium pt-2">Password</h4>

        <label className="text-main py-2" htmlFor="currentPassword">
          Current Password :
        </label>
        <input
          onBlur={PasswordFormik.handleBlur}
          onChange={PasswordFormik.handleChange}
          value={PasswordFormik.values.currentPassword}
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="w-50 form-control text-muted"
          placeholder="***********"
        />
        {PasswordFormik.errors.currentPassword &&
        PasswordFormik.touched.currentPassword ? (
          <div className="alert w-50 alert-danger my-2">
            {PasswordFormik.errors.currentPassword}
          </div>
        ) : (
          ""
        )}

        <label className="text-main py-2" htmlFor="password">
          New Password :
        </label>
        <input
          onBlur={PasswordFormik.handleBlur}
          onChange={PasswordFormik.handleChange}
          value={PasswordFormik.values.password}
          type="password"
          id="password"
          name="password"
          className="w-50 form-control text-muted"
          placeholder="***********"
        />
        {PasswordFormik.errors.password && PasswordFormik.touched.password ? (
          <div className="alert w-50 alert-danger my-2">
            {PasswordFormik.errors.password}
          </div>
        ) : (
          ""
        )}

        <label className="text-main py-2" htmlFor="rePassword">
          RePassword :
        </label>
        <input
          onBlur={PasswordFormik.handleBlur}
          onChange={PasswordFormik.handleChange}
          value={PasswordFormik.values.rePassword}
          type="password"
          id="rePassword"
          name="rePassword"
          className="w-50 form-control text-muted"
          placeholder="***********"
        />
        {PasswordFormik.errors.rePassword &&
        PasswordFormik.touched.rePassword ? (
          <div className="alert w-50 alert-danger my-2">
            {PasswordFormik.errors.rePassword}
          </div>
        ) : (
          ""
        )}
        <div className="h6 fw-bold text-muted pt-3">
          Can’t remember your current password?
          <span onClick={SendEmail} className="text-main cursor-pointer">
            {" "}
            Reset your password.
          </span>
        </div>

        <button
          type="submit"
          disabled={
            !(PasswordFormik.isValid && PasswordFormik.dirty && !loadingPass)
          }
          className="btn my-3 bg-main text-white fw-bold"
        >
          {!loadingPass ? (
            "Save Password"
          ) : (
            <i className="fas fa-spinner fa-spin"></i>
          )}
        </button>
      </form>

      {sendEmail && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={SendEmailFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">Send Email</h4>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={SendEmail}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="currentPassword">
                Send Email :
              </label>
              <input
                onBlur={SendEmailFormik.handleBlur}
                onChange={SendEmailFormik.handleChange}
                value={SendEmailFormik.values.email}
                type="email"
                id="email"
                name="email"
                className=" form-control text-muted"
              />
              {SendEmailFormik.errors.email && SendEmailFormik.touched.email ? (
                <div className="alert alert-danger my-2">
                  {SendEmailFormik.errors.email}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    SendEmailFormik.isValid &&
                    SendEmailFormik.dirty &&
                    !loading
                  )
                }
                className="btn my-3 bg-main text-white fw-bold"
              >
                {!loading ? (
                  "Send Email"
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {resetCode && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={ResetCodeFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">We sent a code to your email</h4>
              <h6>Enter the 6-digit verification code sent</h6>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={ResetCode}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="resetCode">
                Reset Code :
              </label>
              <input
                onBlur={ResetCodeFormik.handleBlur}
                onChange={ResetCodeFormik.handleChange}
                value={ResetCodeFormik.values.resetCode}
                type="text"
                id="resetCode"
                name="resetCode"
                placeholder="6 digit code"
                className=" form-control text-muted"
              />
              {ResetCodeFormik.errors.resetCode &&
              ResetCodeFormik.touched.resetCode ? (
                <div className="alert alert-danger my-2">
                  {ResetCodeFormik.errors.resetCode}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    ResetCodeFormik.isValid &&
                    ResetCodeFormik.dirty &&
                    !loading
                  )
                }
                className="btn my-3 bg-main text-white fw-bold"
              >
                {!loading ? (
                  "Submit"
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {resetPassword && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={ResetPasswordFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">
                Ender Your Email And New Password
              </h4>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={ResetPassword}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="email">
                Email :
              </label>
              <input
                onBlur={ResetPasswordFormik.handleBlur}
                onChange={ResetPasswordFormik.handleChange}
                value={ResetPasswordFormik.values.email}
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className=" form-control text-muted"
              />
              {ResetPasswordFormik.errors.email &&
              ResetPasswordFormik.touched.email ? (
                <div className="alert alert-danger my-2">
                  {ResetPasswordFormik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label className="text-main py-2" htmlFor="newPassword">
                New Password :
              </label>
              <input
                onBlur={ResetPasswordFormik.handleBlur}
                onChange={ResetPasswordFormik.handleChange}
                value={ResetPasswordFormik.values.newPassword}
                type="text"
                id="newPassword"
                name="newPassword"
                placeholder="Enter New Password"
                className=" form-control text-muted"
              />
              {ResetPasswordFormik.errors.newPassword &&
              ResetPasswordFormik.touched.newPassword ? (
                <div className="alert alert-danger my-2">
                  {ResetPasswordFormik.errors.newPassword}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    ResetPasswordFormik.isValid &&
                    ResetPasswordFormik.dirty &&
                    !loading
                  )
                }
                className="btn my-3 bg-main text-white fw-bold"
              >
                {!loading ? (
                  "Submit"
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

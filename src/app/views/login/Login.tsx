import { useState } from "react";

import { setCookie } from "../../logic/Cookie";

import { postData } from "../../logic/Data";

import * as yup from "yup";

import { Form, Formik } from "formik";

import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

interface LoginProps {
  handleLoggedIn(value: string): void;
}

const Login = ({ handleLoggedIn }: LoginProps) => {
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const initialValues: {
    email: string;
  } = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Your email address is not valid")
      .required("Email is a required field"),
  });

  const handleFormSubmit = (data: { email: string }) => {
    setSubmitting(true);

    postData({
      url: process.env.REACT_APP_API_URL + "/login",
      data: data.email,
    })
      .then((response) => {
        setCookie(response.token);
        handleLoggedIn(response.token);
      })
      .catch((err: { message: any }) => {
        setError(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box px={3} py={1}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleFormSubmit(values)}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchema}
          >
            {({ errors, handleChange, handleSubmit, touched, values }) => (
              <Form autoComplete="off" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <p>Welcome! Please enter your email to login.</p>

                <TextField
                  autoFocus
                  fullWidth
                  error={Boolean(errors.email && touched.email)}
                  helperText={errors.email}
                  name="email"
                  onChange={handleChange}
                  size="small"
                  sx={{ mb: 3 }}
                />

                <Box display="flex" justifyContent="flex-end">
                  <LoadingButton
                    loading={submitting}
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>

      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoHideDuration={5000}
        onClose={() => setError("")}
        open={Boolean(error)}
      >
        <Alert
          elevation={6}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;

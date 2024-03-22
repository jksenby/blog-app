import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as LinkLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";
import AuthentificationService from "../../services/authentification/authentification.serivce";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [validate, setValidate] = useState({
    firstName: { error: false, helperText: "" },
    lastName: { error: false, helperText: "" },
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
    confirmPassword: { error: false, helperText: "" },
  });

  const authentificationService = new AuthentificationService();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function onRequired(validated, field) {
    if (validated) {
      setValidate((validate) => ({
        ...validate,
        [field]: { error: false, helperText: "" },
      }));
    } else {
      setValidate((validate) => ({
        ...validate,
        [field]: { error: true, helperText: "This field is required" },
      }));
    }
  }

  async function register(data) {
    try {
      const response = await authentificationService.register(data);

      if (response.error != null) {
        throw new Error();
      } else {
        console.log(response);
        if (response.check != null) {
          setAlreadyRegistered(true);
        } else {
          setAlreadyRegistered(false);
          setRegistrationData(response);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    const data = new FormData(event.currentTarget);
    const form = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    Object.entries(form).forEach((item) => {
      if (item[1] === "") {
        onRequired(false, item[0]);
        hasError = true;
      } else {
        onRequired(true, item[0]);
      }
    });

    if (hasError) return;

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegEx.test(form.email)) {
      setValidate((validate) => ({
        ...validate,
        password: {
          error: true,
          helperText: "Email is not valid",
        },
      }));
      hasError = true;
    } else {
      setValidate((validate) => ({
        ...validate,
        password: { error: false, helperText: "" },
      }));
    }

    if (hasError) return;

    const passwordRegEx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!passwordRegEx.test(form.password)) {
      setValidate((validate) => ({
        ...validate,
        password: {
          error: true,
          helperText:
            "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
        },
      }));
      hasError = true;
    } else {
      setValidate((validate) => ({
        ...validate,
        password: { error: false, helperText: "" },
      }));
    }

    if (hasError) return;

    if (form.confirmPassword !== form.password) {
      setValidate((validate) => ({
        ...validate,
        confirmPassword: {
          error: true,
          helperText: "The passwords do not match!",
        },
      }));
      hasError = true;
    } else {
      setValidate((validate) => ({
        ...validate,
        confirmPassword: { error: false, helperText: "" },
      }));
    }

    if (hasError) return;

    console.log(form);
    register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      username: form.username,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "orange" }}>
            <AllInclusiveIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={validate.firstName.error}
                  helperText={validate.firstName.helperText}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={validate.lastName.error}
                  helperText={validate.lastName.helperText}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="user-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validate.email.error}
                  helperText={validate.email.helperText}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validate.password.error}
                  helperText={validate.password.helperText}
                  required
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validate.confirmPassword.error}
                  helperText={validate.confirmPassword.helperText}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="new-confirmPassword"
                />
              </Grid>
            </Grid>
            {alreadyRegistered && (
              <p style={{ color: "red" }}>
                There is already with such email or username
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"}>
                  <LinkLabel component={"p"} variant="body2">
                    Already have an account? Sign in
                  </LinkLabel>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Registration;

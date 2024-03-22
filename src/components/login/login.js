import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthentificationService from "../../services/authentification/authentification.serivce";

const defaultTheme = createTheme();

function Login() {
  const [validate, setValidate] = useState({
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const authentificationService = new AuthentificationService();

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

  async function login(data) {
    try {
      const response = await authentificationService.login(data);

      if (response.error != null) {
        throw new Error();
      } else {
        alert(response.message);
        setLoginData(response.user);
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
      email: data.get("email"),
      password: data.get("password"),
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
    console.log(form);
    login(form);
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AllInclusiveIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={validate.email.error}
              helperText={validate.email.helperText}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={validate.password.error}
              helperText={validate.password.helperText}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link to={"/register"}>
                  <LinkLabel component={"p"} variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;

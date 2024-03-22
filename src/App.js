import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Spinner from "./components/spinner/spinner";

const Register = lazy(() => import("./components/registration/registration")),
  Login = lazy(() => import("./components/login/login"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/pages/NotFound";
import Contact from "./components/pages/Contact";
import AboutUs from "./components/pages/AboutUs";
import QuizForm from "./components/pages/QuizForm";
import Quiz from "./components/pages/Quiz";
import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1300}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/quizform" component={QuizForm} />
        <Route exact path="/quiz" component={Quiz} />
        <Route path="/contact" component={Contact} />
        <Route path="/aboutus" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

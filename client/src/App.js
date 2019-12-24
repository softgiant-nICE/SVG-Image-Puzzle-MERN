import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { clearCurrentImage } from "./actions/imageActions";

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import DashImage from "./components/dashimage/DashImage";
import Curso from "./components/image/Curso";

import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import CrearTema from "./components/crear-tema/CrearTema";
import EditImage from "./components/edit-image/EditImage";
import AddCurso from "./components/add-imgcredentials/AddCurso";
import AddObjetos from "./components/add-imgcredentials/AddObjetos";

import Cuestionarios from "./components/add-imgcredentials/Cuestionarios";
import UserQuestionnaires from "./components/questionnaires/UserQuestionnaires";
import Image from "./components/image/Image";

import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";
import "./App.css";
import AllQuestionnaires from "./components/questionnaires/AllQuestionnaires";
import Questionnaire from "./components/questionnaire/Questionnaire";
import UserItems from "./components/user-items/index.js";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 100000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Clear current Profile
    store.dispatch(clearCurrentImage());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route
                exact
                path="/questionnaire/:id"
                component={Questionnaire}
              />
              <Route
                exact
                path="/all-questionnaires"
                component={AllQuestionnaires}
              />
              <Route exact path="/image/:handle" component={Image} />
              <Switch>
                <PrivateRoute exact path="/dashimage" component={DashImage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/curso/:_id/" component={Curso} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/crear-tema" component={CrearTema} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-image" component={EditImage} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/subir-imagen" component={AddCurso} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/editar-objetos"
                  component={AddObjetos}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/cuestionarios"
                  component={Cuestionarios}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/user-questionnaires"
                  component={UserQuestionnaires}
                />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/user-items" component={UserItems} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

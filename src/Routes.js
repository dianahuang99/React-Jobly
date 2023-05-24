import React from "react";
import { Switch, Route } from "react-router-dom";
import CompaniesList from "./CompaniesList";
import Company from "./Company";
import Home from "./Home";
import NewFoodForm from "./SignUpForm";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import UpdateProfileForm from "./UpdateProfileForm";
import PrivateRoute from "./PrivateRoute";

const Routes = ({ login, getCompany, register }) => (
  <main>
    <Switch>
      <PrivateRoute exact path="/companies">
        <CompaniesList title="Companies" />
      </PrivateRoute>
      <PrivateRoute path="/companies/:handle">
        <Company cantFind="/companies" getCompany={getCompany} />
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
        <JobsList />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <UpdateProfileForm />
      </PrivateRoute>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <NewFoodForm register={register} />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route>
        <p>Hmmm. I can't seem to find what you want.</p>
      </Route>
    </Switch>
  </main>
);

export default Routes;

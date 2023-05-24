import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import JoblyApi from "./JoblyAPI";
import NavBar from "./NavBar";
import Routes from "./Routes.js";
import userContext from "./userContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setIsLoading(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.

      setIsLoading(false);
      getCurrentUser();
    },
    [token]
  );

  async function getCompany(handle) {
    const company = await JoblyApi.getCompany(handle);
    return company;
  }

  async function register(data) {
    try {
      let token = await JoblyApi.register(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { sucess: false, errors: err };
    }
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { sucess: false, errors: err };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!isLoading) return <h3>Loading...</h3>;

  return (
    <div className="App">
      <userContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <BrowserRouter>
          <NavBar logout={logout} />
          <Routes login={login} getCompany={getCompany} register={register} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;

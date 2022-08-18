import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import JoblyApi from "./JoblyAPI";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import CompaniesJobsList from "./CompaniesJobsList";
import Company from "./Company";
import NewFoodForm from "./NewFoodForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  useEffect(() => {
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getDrinks();
  }, []);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      // console.log(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      // console.log(jobs);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  async function getCompany(handle) {
    let company = await JoblyApi.getCompany(handle);
    setIsLoading(false);
    return company;
  }

  async function addDrink(data) {
    let newDrink = await SnackOrBoozeApi.addDrink(data);
    console.log(newDrink);
    setIsLoading(false);
  }

  async function addSnack(data) {
    let newSnack = await SnackOrBoozeApi.addSnack(data);
    console.log(newSnack);
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/companies">
              <CompaniesJobsList companies={companies} title="Companies" />
            </Route>
            <Route path="/companies/:handle">
              <Company
                companies={companies}
                cantFind="/companies"
                getCompany={getCompany}
              />
            </Route>
            <Route exact path="/jobs">
              <CompaniesJobsList jobs={jobs} title="Jobs" />
            </Route>
            <Route path="/profile">
              {/* <FoodItem items={drinks} cantFind="/drinks" /> */}
            </Route>
            <Route exact path="/new">
              <NewFoodForm addDrink={addDrink} addSnack={addSnack} />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

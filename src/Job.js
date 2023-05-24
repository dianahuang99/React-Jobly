import React, { useContext, useState, useEffect } from "react";
import userContext from "./userContext";
import Button from "react-bootstrap/Button";

const Job = ({ id, title, companyName, salary, equity }) => {
  const { hasAppliedToJob, applyToJob } = useContext(userContext);
  const [applied, setApplied] = useState();

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <>
      <h2> {title}</h2>
      <h5>{companyName}</h5>
      <p>Salary: {salary ? salary.toLocaleString("en-US") : 0}</p>
      <p>Equity: {equity ? equity : 0}</p>
      <Button variant={"danger"} onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </Button>
    </>
  );
};

export default Job;

import React, { useState, useEffect } from "react";
import "./List.css";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import JoblyApi from "./JoblyAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Job from "./Job";

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const INITIAL_STATE = {
    title: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  if (isLoading) return <h3>Loading...</h3>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(INITIAL_STATE);
    let result = await JoblyApi.filterJobs(formData);
    setJobs(result.jobs);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <section className="col-md-9">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Jobs List
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter search term..."
                required
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Submit
            </Button>
          </Form>

          <ListGroup>
            {jobs.length ? (
              jobs.map((job) => (
                <ListGroupItem>
                  <Job
                    id={job.id}
                    title={job.title}
                    companyName={job.companyName}
                    salary={job.salary}
                    equity={job.equity}
                  />
                </ListGroupItem>
              ))
            ) : (
              <p>Sorry, no results were found!</p>
            )}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobsList;

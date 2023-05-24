import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import JoblyApi from "./JoblyAPI";

function CompaniesList({ filterCompanies }) {
  const [companies, setCompanies] = useState([]);
  const INITIAL_STATE = {
    name: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(INITIAL_STATE);
    let result = await JoblyApi.filterCompanies(formData);
    setCompanies(result.companies);
  };

  if (isLoading) return <h3>Loading...</h3>;

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
            Companies List
          </CardTitle>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                id="name"
                name="name"
                value={formData.name}
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
            {companies.length ? (
              companies.map((company) => (
                <Link to={`/companies/${company.handle}`} key={company.handle}>
                  <ListGroupItem>
                    <h3> {company.name}</h3>

                    <p>{company.description}</p>
                  </ListGroupItem>
                </Link>
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

export default CompaniesList;

import React from "react";
import { Link } from "react-router-dom";
import "./FoodMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function CompaniesJobsList({ companies, jobs }) {
  return (
    <section className="col-md-9">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {companies ? "Companies" : "Jobs"} List
          </CardTitle>
          <CardText>These</CardText>
          <ListGroup>
            {companies
              ? companies.map((company) => (
                  <Link
                    to={`/companies/${company.handle}`}
                    key={company.handle}
                  >
                    <ListGroupItem>
                      <h3> {company.name}</h3>

                      <p>{company.description}</p>
                    </ListGroupItem>
                  </Link>
                ))
              : jobs.map((job) => (
                  <ListGroupItem>
                    <h2> {job.title}</h2>

                    <h5>{job.companyName}</h5>
                    <p>Salary: {job.salary}</p>
                    <p>Equity: {job.equity ? job.equity : 0}</p>
                  </ListGroupItem>
                ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompaniesJobsList;

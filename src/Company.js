import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroupItem } from "reactstrap";
import userContext from "./userContext";
import Job from "./Job";

function Company({ cantFind, getCompany }) {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    async function getCompanyDetails() {
      try {
        const foundCompany = await getCompany(handle);
        setCompany(foundCompany);
        console.log(currentUser);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        history.push(cantFind);
      }
    }
    getCompanyDetails();
  }, []);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {company.name}
          </CardTitle>
          <CardText className="font-italic">{company.description}</CardText>

          <p>
            <b>Employees:</b> {company.numEmployees}
          </p>

          {company.jobs
            ? company.jobs.map((job) => (
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
            : null}
        </CardBody>
      </Card>
    </section>
  );
}

export default Company;

import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroupItem } from "reactstrap";

function Company({ companies, cantFind, getCompany }) {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  // useEffect(() => {
  async function getCompanyDetails() {
    try {
      const foundCompany = await getCompany(handle);
      setCompany(foundCompany);
      // if (!foundCompany) return "hi";
    } catch (e) {
      console.log(e);
    }
  }
  //   getCompanyDetails();
  // }, []);
  console.log(company);
  return "hi";
  // return (
  //   <section>
  //     <Card>
  //       <CardBody>
  //         {console.log(company)}
  //         <CardTitle className="font-weight-bold text-center">
  //           {company.name}
  //         </CardTitle>
  //         <CardText className="font-italic">{company.description}</CardText>
  //         <p>
  //           <b>Employees:</b> {company.numEmployees}
  //         </p>

  //         {/* <p>
  //           {company.jobs.map((job) => (
  //             <ListGroupItem>
  //               <h2> {job.title}</h2>

  //               <p>Salary: {job.salary}</p>
  //               <p>Equity: {job.equity ? job.equity : 0}</p>
  //             </ListGroupItem>
  //           ))}
  //         </p> */}
  //       </CardBody>
  //     </Card>
  //   </section>
  // );
}

export default Company;

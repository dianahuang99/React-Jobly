import React, { useContext } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import userContext from "./userContext";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

function Home() {
  const { currentUser } = useContext(userContext);
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h1 className="font-weight-bold">Jobly</h1>
          </CardTitle>
          <p>All the jobs in one, convenient place.</p>
          <h3>
            {currentUser ? (
              `Welcome back ${currentUser.firstName}`
            ) : (
              <>
                {" "}
                <NavLink to="/login">
                  <Button variant="info">Login</Button>
                </NavLink>{" "}
                <NavLink to="/signup">
                  <Button variant="info">Sign Up</Button>
                </NavLink>
              </>
            )}
          </h3>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;

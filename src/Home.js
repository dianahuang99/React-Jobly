import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <h5>
            We have a selection of {snacks.length} snacks and {drinks.length}{" "}
            drinks to choose from!
          </h5>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;

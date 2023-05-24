import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const LoginForm = ({ login }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(INITIAL_STATE);
    let result = await login(formData);
    console.log(result);
    if (result.success) {
      history.push("/companies");
    } else {
      console.log("errors" + result.errors);
      setFormErrors(result.errors);
    }
    console.log(formErrors);
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
          {formErrors.length ? formErrors.map((err) => <p>{err}</p>) : null}
          <CardTitle className="font-weight-bold text-center">Log In</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="username"
                name="username"
                value={formData.usernname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewTodoForm = ({ addSnack, addDrink }) => {
  const INITIAL_STATE = {
    foodType: "",
    name: "",
    description: "",
    recipe: "",
    serve: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(INITIAL_STATE);
    const { name, description, recipe, serve } = formData;
    console.log(formData);
    formData.foodType === "snack"
      ? addSnack({ name, description, recipe, serve })
      : addDrink({ name, description, recipe, serve });
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
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            New Menu Item
          </CardTitle>
          <CardText className="font-italic">
            Adding a new snack or drink on the menu? Please enter the details
            below.
          </CardText>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Check
                inline
                label="Snack"
                type="radio"
                id="snack"
                name="foodType"
                value="snack"
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Drink"
                type="radio"
                id="drink"
                name="foodType"
                value="drink"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipe</Form.Label>
              <Form.Control
                id="recipe"
                name="recipe"
                value={formData.recipe}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Serve</Form.Label>
              <Form.Control
                id="serve"
                name="serve"
                value={formData.serve}
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

export default NewTodoForm;

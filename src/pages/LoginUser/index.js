import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { loginUser } from "../../store/User/actions";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectUserToken } from "../../store/User/selectors";

export default function LogInUser() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //selector
  const token = useSelector(selectUserToken);

  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(loginUser(email, password));

    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Log In User</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Button
              variant="primary"
              type="submit"
              onClick={submitForm}
              style={{ marginBottom: 100 }}
            >
              Log In
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

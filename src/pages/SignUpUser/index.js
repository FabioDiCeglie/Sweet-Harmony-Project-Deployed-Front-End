import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserToken } from "../../store/User/selectors";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { signUpUser } from "../../store/User/actions";

export default function SignUpUser() {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUpUser(name, email, password));

    setName("");
    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Sign Up User</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>
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
              Sign up User
            </Button>
          </Form.Group>{" "}
        </Form>
      </Container>
    </div>
  );
}

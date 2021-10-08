import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  //check if user is already logged in, if yes then redirect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
      //window.location.reload();
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = e => {
    e.preventDefault();

    //first check if password === confirm password
    if (password !== confirmPassword) {
      setMessage("Passwords donot match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          {/** Name */}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          {/** Email */}
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted" className="mb-3">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/**Password */}
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          {/**Confirm Password */}
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;

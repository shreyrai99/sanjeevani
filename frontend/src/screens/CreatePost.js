import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createPost } from "../actions/postActions";
import FormContainer from "../components/FormContainer";

const CreatePost = ({ location, history }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //check if user is already logged in, if yes then redirect

  const submitHandler = e => {
    dispatch(createPost({ text, title, link, image }));
  };

  return userInfo && loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <FormContainer>
      <Alert variant="info" className="text-center">
        <h1>What's on your mind?</h1>
      </Alert>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/** Title */}
        <Form.Group controlId="title">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Enter title of your post"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/**Text */}
        <Form.Group controlId="text">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Body of your post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </Form.Group>

        {/**Image*/}
        <Form.Group controlId="image">
          <Form.Label>Image URL (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL..."
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Create new post
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePost;

import { Card, Button, Col, Row, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addLike,
  removeLike,
  deletePost,
  listPostDetails,
  commentCreatePost
} from "../actions/postActions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { POST_DETAILS_RESET } from "../constants/postConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Comment from "../components/Comment";

const PostDetails = ({ match, history }) => {
  const [newCommentTitle, setNewCommentTitle] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  const postDetails = useSelector(state => state.postDetails);
  const { post, loading, error } = postDetails;
  const [like, setLike] = useState(false);
  const [unlike, setUnLike] = useState(false);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({ type: POST_DETAILS_RESET });
    dispatch(listPostDetails(match.params.id));
    setLike(false);
    setUnLike(false);
    setDel(false);
  }, [dispatch, match, like, unlike, del, userInfo, history]);

  const likePost = id => {
    dispatch(addLike(id));
    setLike(true);
  };
  const unlikePost = id => {
    dispatch(removeLike(id));
    setUnLike(true);
  };
  const delPost = id => {
    dispatch(deletePost(id));
    setDel(true);
  };
  const submitHandler = e => {
    const comment = { title: newCommentTitle, text: newCommentText };
    dispatch(commentCreatePost(comment, match.params.id));
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {userInfo && post && (
        <>
          <Row>
            <Col md={6}>
              <h1>{post.title}</h1>
              <Card className="my-3 p-3 rounded">
                {post.image && (
                  <Link to={`/post/${post._id}`}>
                    <Card.Img
                      src={post.image}
                      variant="top"
                      style={{ maxHeight: "200px" }}
                      onError={event =>
                        (event.target.src = "/images/sample.jpg")
                      }
                    />
                  </Link>
                )}

                <Card.Body>
                  <Card.Title>{post.name}</Card.Title>
                  <Card.Text>{post.text}</Card.Text>
                  {post.date && (
                    <>
                      <div className="text-muted mb-3">
                        Posted on {formatDate(post.date.slice(0, 10))}
                      </div>
                      <span>
                        <Button
                          type="button"
                          className="btn btn-light rounded"
                          onClick={() => likePost(post._id)}
                        >
                          {post.likes.find(
                            like => like.user.toString() === userInfo._id
                          ) ? (
                            <i className="fas fa-thumbs-up text-info"></i>
                          ) : (
                            <i className="fas fa-thumbs-up"></i>
                          )}{" "}
                          <span>{post.likes.length}</span>
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-light rounded"
                          onClick={() => unlikePost(post._id)}
                        >
                          <i className="fas fa-thumbs-down"></i>
                        </Button>
                      </span>
                    </>
                  )}
                  {post._id && (
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-info btn-sm rounded"
                    >
                      <span>{post.comments.length} </span>Comments
                    </Link>
                  )}{" "}
                  {post.user && post.user === userInfo._id ? (
                    <Button
                      type="button"
                      className="btn btn-danger btn-sm rounded"
                      onClick={() => delPost(post._id)}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
            {post.comments && (
              <Col md={6}>
                <h2>Comments</h2>
                {post && post.comments && post.comments.length === 0 && (
                  <Message>No comments yet</Message>
                )}
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Write a reply</h4>
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="commentTitle">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            placeholder="Enter title of your comment..."
                            required
                            value={newCommentTitle}
                            onChange={e => setNewCommentTitle(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="commentTitle">
                          <Form.Label>Text</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            placeholder="Enter body of your comment..."
                            required
                            value={newCommentText}
                            onChange={e => setNewCommentText(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {post.comments &&
                      post._id &&
                      post.comments.map(comment => (
                        <div key={comment._id}>
                          <Comment postId={post._id} comment={comment} />
                        </div>
                      ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            )}
          </Row>
          {/*post.comments && (
            <Row>
              <Col md={6}>
                <h2>Comments</h2>
                {post && post.comments && post.comments.length === 0 && (
                  <Message>No comments yet</Message>
                )}
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Write a reply</h4>
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="commentTitle">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            as="textarea"
                            required
                            value={newCommentTitle}
                            onChange={e => setNewCommentTitle(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="commentTitle">
                          <Form.Label>Text</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            required
                            value={newCommentTitle}
                            onChange={e => setNewCommentTitle(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
                    )*/}

          {/*post.comments && (
            <>
              <Row>
                <div className="my-3 p-3 rounded bg-info p">
                  <h3>Make a comment</h3>
                </div>
              </Row>
              <Row>
                {post.comments.map(comment => (
                  <Col key={comment._id} sm={10} md={10} lg={10} xl={10}>
                    <Comment comment={comment} />
                  </Col>
                ))}
              </Row>
            </>
          )*/}
        </>
      )}
    </>
  );
  /* return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    userInfo && (
      <>
        <Card className="my-3 p-3 rounded">
          <Card.Header as="h3">{post.title}</Card.Header>
          {post.image && (
            <Link to={`/post/${post._id}`}>
              <Card.Img
                src={post.image}
                variant="top"
                style={{ maxHeight: "200px" }}
                onError={event => (event.target.src = "/images/sample.jpg")}
              />
            </Link>
          )}

          <Card.Body>
            <Card.Title>{post.name}</Card.Title>
            <Card.Text>{post.text}</Card.Text>
            {post.date && (
              <>
                <div className="text-muted mb-3">
                  Posted on {formatDate(post.date.slice(0, 10))}
                </div>
                <span>
                  <Button
                    type="button"
                    className="btn btn-light rounded"
                    onClick={() => likePost(post._id)}
                  >
                    {post.likes.find(
                      like => like.user.toString() === userInfo._id
                    ) ? (
                      <i className="fas fa-thumbs-up text-info"></i>
                    ) : (
                      <i className="fas fa-thumbs-up"></i>
                    )}{" "}
                    <span>{post.likes.length}</span>
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-light rounded"
                    onClick={() => unlikePost(post._id)}
                  >
                    <i className="fas fa-thumbs-down"></i>
                  </Button>
                </span>
              </>
            )}
            {post._id && (
              <Link
                to={`/post/${post._id}`}
                className="btn btn-info btn-sm rounded"
              >
                <span>{post.comments.length} </span>Comments
              </Link>
            )}{" "}
            {post.user && post.user === userInfo._id ? (
              <Button
                type="button"
                className="btn btn-danger btn-sm rounded"
                onClick={() => delPost(post._id)}
              >
                <i className="fas fa-times"></i>
              </Button>
            ) : null}
          </Card.Body>
        </Card>
      </>
    )
  );*/
};
export default PostDetails;

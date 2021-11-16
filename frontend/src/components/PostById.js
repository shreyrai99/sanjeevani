import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addLike, listPostDetails } from "../actions/postActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
const PostById = props => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  const postDetails = useSelector(state => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    }
    dispatch(listPostDetails(props._id));
  }, [dispatch, props]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Card className="my-3 p-3 rounded" border="primary">
        <Card.Header as="h3">{post.name}</Card.Header>
        {post.image && (
          <Link to={`/post/${post._id}`}>
            <Card.Img
              src={post.image}
              variant="top"
              style={{ maxHeight: "300px" }}
              onError={event => (event.target.src = "/images/sample.jpg")}
            />
          </Link>
        )}

        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.text}</Card.Text>
          {userInfo && (
            <span>
              <Button
                type="button"
                className="btn btn-light rounded"
                onClick={() => dispatch(addLike(post._id))}
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
              <Button type="button" className="btn btn-light rounded">
                <i className="fas fa-thumbs-down"></i>
              </Button>
            </span>
          )}
          <Link
            to={`/post/${post._id}`}
            className="btn btn-info btn-sm rounded"
          >
            <span>{post.comments.length} </span>Comments
          </Link>{" "}
          {post.user === userInfo._id ? (
            <Button type="button" className="btn btn-danger btn-sm rounded">
              <i className="fas fa-times"></i>
            </Button>
          ) : null}
        </Card.Body>
        <Card.Footer className="text-muted">
          {post.date && <p>Posted on {formatDate(post.date.slice(0, 10))}</p>}
        </Card.Footer>
      </Card>
    </>
  );
};
export default PostById;

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addLike, removeLike, deletePost } from "../actions/postActions";
import { useDispatch } from "react-redux";
const Post = props => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  return (
    <>
      <Card className="my-3 p-3 rounded" border="primary">
        <Card.Header as="h3">{props.post.name}</Card.Header>
        {props.post.image && (
          <Link to={`/post/${props.post._id}`}>
            <Card.Img
              src={props.post.image}
              variant="top"
              style={{ maxHeight: "300px" }}
              onError={event => (event.target.src = "/images/sample.jpg")}
            />
          </Link>
        )}

        <Card.Body>
          <Card.Title>{props.post.title}</Card.Title>
          <Card.Text>{props.post.text}</Card.Text>
          {userInfo && (
            <span>
              <Button
                type="button"
                className="btn btn-light rounded"
                onClick={() => dispatch(addLike(props.post._id))}
              >
                {props.post.likes.find(
                  like => like.user.toString() === userInfo._id
                ) ? (
                  <i className="fas fa-thumbs-up text-info"></i>
                ) : (
                  <i className="fas fa-thumbs-up"></i>
                )}{" "}
                <span>{props.post.likes.length}</span>
              </Button>
              <Button
                type="button"
                className="btn btn-light rounded"
                onClick={() => dispatch(removeLike(props.post._id))}
              >
                <i className="fas fa-thumbs-down"></i>
              </Button>
            </span>
          )}
          <Link
            to={`/post/${props.post._id}`}
            className="btn btn-info btn-sm rounded"
          >
            <span>{props.post.comments.length} </span>Comments
          </Link>{" "}
          {props.post.user === userInfo._id ? (
            <Button
              type="button"
              className="btn btn-danger btn-sm rounded"
              onClick={() => dispatch(deletePost(props.post._id))}
            >
              <i className="fas fa-times"></i>
            </Button>
          ) : null}
        </Card.Body>
        <Card.Footer className="text-muted">
          Posted on {formatDate(props.post.date.slice(0, 10))}
        </Card.Footer>
      </Card>
    </>
  );
};
export default Post;

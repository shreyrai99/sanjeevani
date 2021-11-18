import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteCommentPost } from "../actions/postActions";
import { useDispatch } from "react-redux";

const Comment = ({ comment, postId }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Card.Header as="h3">{comment.title}</Card.Header>
        {comment.image && (
          <Link to={`/comment/${comment._id}`}>
            <Card.Img
              src={comment.image}
              variant="top"
              style={{ maxHeight: "200px" }}
              onError={event => (event.target.src = "/images/sample.jpg")}
            />
          </Link>
        )}

        <Card.Body>
          <Card.Title>{comment.name}</Card.Title>
          <Card.Text>{comment.text}</Card.Text>
          {comment.date && (
            <>
              <div className="text-muted mb-3">
                Commented on {formatDate(comment.date.slice(0, 10))}
              </div>
            </>
          )}
          {userInfo && comment.user === userInfo._id ? (
            <Button
              type="button"
              className="btn btn-danger btn-sm rounded"
              onClick={() => dispatch(deleteCommentPost(postId, comment._id))}
            >
              <i className="fas fa-times"></i>
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
};
export default Comment;

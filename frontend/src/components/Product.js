import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const product = props => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${props.product._id}`}>
          <Card.Img
            src={props.product.image}
            variant="top"
            onError={event => (event.target.src = "/images/sample.jpg")}
          />
        </Link>

        <Card.Body>
          <Link to={`/product/${props.product._id}`}>
            <Card.Text as="div">
              <strong>{props.product.name}</strong>
            </Card.Text>
          </Link>
          <Card.Text as="div">
            <Rating
              value={props.product.rating}
              text={`${props.product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">₹{props.product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default product;

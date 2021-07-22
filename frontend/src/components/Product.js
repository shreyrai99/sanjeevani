import { Card } from "react-bootstrap";
import Rating from "./Rating";
const product = props => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <a href={`/product/${props.product._id}`}>
          <Card.Img src={props.product.image} variant="top" />
        </a>

        <Card.Body>
          <a href={`/product/${props.product._id}`}>
            <Card.Text as="div">
              <strong>{props.product.name}</strong>
            </Card.Text>
          </a>
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

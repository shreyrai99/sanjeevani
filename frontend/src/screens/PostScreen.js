import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

const PostScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector(state => state.postList); //we want "postList" part of state
  const { loading, error, posts } = postList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listPosts());
  }, [userInfo, dispatch, history]);

  /*
  //without Redux
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
*/

  return (
    <>
      <h1>Community Posts</h1>
      <Meta title="Community Posts" />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {posts && (
        <Row>
          {posts.map(post => (
            <Col key={post._id} sm={12} md={12} lg={12} xl={12}>
              <Post post={post} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default PostScreen;

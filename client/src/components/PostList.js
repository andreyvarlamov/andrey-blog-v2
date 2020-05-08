import React, { useState, useEffect, Fragment } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
  Container,
  Row,
  Col,
  ListGroupItemText,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TimeAgo from "javascript-time-ago";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";

import {
  getPosts as getPostsAction,
  deletePost as deletePostAction,
  setFilter as setFilterAction,
  removeFilter as removeFilterAction,
} from "../redux/actions/postActions";

function PostList(props) {
  const { posts, filter } = props.post;

  const { getPosts, deletePost, setFilter, removeFilter, user } = props;

  // Add locale-specific relative date/time formatting rules.
  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    getPosts(filter);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [filter]);

  const deletePostClick = id => {
    deletePost(id, filter);
  };

  const removeFilterClick = () => {
    removeFilter();
  };

  return (
    <Fragment>
      <Container style={{ padding: 0 }} fluid={true}>
        <Row>
          <Col xs="auto">
            <h3 className="mb-4">
              {!filter ? "All bBlog" : filter.name + "'"} Posts
            </h3>
          </Col>
          <Col xs="auto">
            {filter ? (
              <Button color="danger" onClick={removeFilterClick} size="sm">
                &times;
              </Button>
            ) : null}
          </Col>
        </Row>
      </Container>

      <ListGroup>
        {posts.map(post => (
          <ListGroupItem key={post._id}>
            <ListGroupItemHeading>{post.title}</ListGroupItemHeading>
            <ListGroupItemText
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "rgba(0, 0, 0, 0.125)",
                borderRadius: "1rem",
                padding: "0.8rem",
              }}
            >
              {post.body}
            </ListGroupItemText>
            <ListGroupItemText style={{ marginBottom: "0" }}>
              <em>
                Posted {timeAgo.format(new Date(post.date))} by{" "}
                <span
                  onClick={() => {
                    setFilter({
                      id: post.postedBy._id,
                      name: post.postedBy.name,
                    });
                  }}
                  style={{ padding: "0" }}
                  className="btn btn-link"
                >
                  {post.postedBy.name}
                </span>
              </em>
            </ListGroupItemText>

            {user && user._id === post.postedBy._id ? (
              <ListGroupItemText>
                <Button
                  color="danger"
                  onClick={() => deletePostClick(post._id)}
                  className="mt-3"
                >
                  Delete
                </Button>
              </ListGroupItemText>
            ) : null}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    post: state.post,
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: filter => dispatch(getPostsAction(filter)),
    deletePost: (id, filter) => dispatch(deletePostAction(id, filter)),
    removeFilter: () => dispatch(removeFilterAction()),
    setFilter: filter => dispatch(setFilterAction(filter)),
  };
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

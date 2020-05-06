import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPosts as getPostsAction } from "../redux/actions/postActions";

function PostList(props) {
  const { posts } = props.post;

  const { getPosts } = props;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const deletePost = id => {
    // setPosts(posts.filter(post => post._id !== id));
  };

  return (
    <ListGroup>
      <TransitionGroup className="post-list">
        {posts.map(post => (
          <CSSTransition key={post._id} timeout={300} classNames="fade">
            <ListGroupItem>
              <p>
                <strong>{post.title}</strong> by {post.postedBy} on{" "}
                {new Date(post.date()).toDateString()}
              </p>
              <p>{post.body}</p>
              <Button color="danger" onClick={() => deletePost(post._id)}>
                Delete
              </Button>
            </ListGroupItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ListGroup>
  );
}

const mapStateToProps = state => {
  return { post: state.post };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(getPostsAction()),
  };
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

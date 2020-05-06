import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getPosts as getPostsAction,
  deletePost as deletePostAction,
} from "../redux/actions/postActions";

function PostList(props) {
  const { posts } = props.post;

  const { getPosts, deletePost } = props;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const deletePostClick = id => {
    deletePost(id);
  };

  return (
    <ListGroup>
      <TransitionGroup className="post-list">
        {posts.map(post => (
          <CSSTransition key={post._id} timeout={300} classNames="fade">
            <ListGroupItem>
              <p>
                <strong>{post.title}</strong> by {post.postedBy} on{" "}
                {new Date(post.date).toDateString()}
              </p>
              <p>{post.body}</p>
              <Button color="danger" onClick={() => deletePostClick(post._id)}>
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
    deletePost: id => dispatch(deletePostAction(id)),
  };
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

import React, { useState, useEffect, Fragment } from "react";
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

  const { getPosts, deletePost, user } = props;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const deletePostClick = id => {
    deletePost(id);
  };

  return (
    <Fragment>
      <h3 className="mb-4">All bBlog Posts</h3>
      <ListGroup>
        <TransitionGroup className="post-list">
          {posts.map(post => (
            <CSSTransition key={post._id} timeout={300} classNames="fade">
              <ListGroupItem>
                <p>
                  <strong>{post.title}</strong> by {post.postedBy.name} on{" "}
                  {new Date(post.date).toDateString()}
                </p>
                <p>{post.body}</p>
                {user && user._id === post.postedBy._id ? (
                  <Button
                    color="danger"
                    onClick={() => deletePostClick(post._id)}
                  >
                    Delete
                  </Button>
                ) : null}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
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
    getPosts: () => dispatch(getPostsAction()),
    deletePost: id => dispatch(deletePostAction(id)),
  };
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

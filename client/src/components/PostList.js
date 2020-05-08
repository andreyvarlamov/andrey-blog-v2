import React, { useState, useEffect, Fragment } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getPosts as getPostsAction,
  deletePost as deletePostAction,
  getFilteredPosts as getFilteredPostsAction,
  setFilter as setFilterAction,
  removeFilter as removeFilterAction,
} from "../redux/actions/postActions";

function PostList(props) {
  const { posts, filter } = props.post;

  const {
    getPosts,
    getFilteredPosts,
    deletePost,
    setFilter,
    removeFilter,
    user,
  } = props;

  useEffect(() => {
    if (filter) getFilteredPosts({ id: filter.id });
    else getPosts();
    // eslint-disable-next-line
  }, [filter]);

  const deletePostClick = id => {
    deletePost(id);
  };

  const removeFilterClick = () => {
    removeFilter();
  };

  return (
    <Fragment>
      <ListGroup horizontal>
        <ListGroupItem>
          <h3 className="mb-4">All bBlog Posts</h3>
        </ListGroupItem>
        <ListGroupItem>
          <Button onClick={removeFilterClick}>&times;</Button>
        </ListGroupItem>
        <ListGroupItem>
          <Button
            onClick={() => {
              setFilter({ id: "5eb4869176ed361b4e9368b1" });
            }}
          >
            test
          </Button>
        </ListGroupItem>
      </ListGroup>

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
    getFilteredPosts: query => dispatch(getFilteredPostsAction(query)),
    deletePost: id => dispatch(deletePostAction(id)),
    removeFilter: () => dispatch(removeFilterAction()),
    setFilter: filter => dispatch(setFilterAction(filter)),
  };
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getFilteredPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

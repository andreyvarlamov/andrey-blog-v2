import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";

function PostList() {
  const postArray = [
    {
      _id: uuid(),
      title: "Post 1",
      body: "This is post 1",
      postedBy: "Poster 1",
      date: Date.now,
    },
    {
      _id: uuid(),
      title: "Post 2",
      body: "This is post 2",
      postedBy: "Poster 2",
      date: Date.now,
    },
    {
      _id: uuid(),
      title: "Post 3",
      body: "This is post 3",
      postedBy: "Poster 3",
      date: Date.now,
    },
  ];

  const [posts, setPosts] = useState(postArray);

  const deletePost = id => {
    setPosts(posts.filter(post => post._id !== id));
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

export default PostList;

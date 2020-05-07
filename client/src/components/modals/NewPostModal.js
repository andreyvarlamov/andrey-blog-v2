import React, { Fragment, useState } from "react";
import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPost as addPostAction } from "../../redux/actions/postActions";

function NewPostModal(props) {
  const [modal, setModal] = useState(false);

  const [postedBy, setPostedBy] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { addPost } = props;

  const toggle = () => {
    setModal(prevModal => !prevModal);
  };

  const submitForm = e => {
    e.preventDefault();

    const newPost = { title, body, postedBy };

    addPost(newPost);

    toggle();
  };

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        New Post
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitForm}>
            <FormGroup>
              <Label for="postedBy">Posted By</Label>
              <Input
                type="text"
                name="postedBy"
                id="postedBy"
                placeholder="Posted By"
                onChange={e => setPostedBy(e.target.value)}
                value={postedBy}
                className="mb-3"
              ></Input>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
                value={title}
                className="mb-3"
              ></Input>
              <Label for="body">Body</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                onChange={e => setBody(e.target.value)}
                value={body}
                className="mb-3"
              ></Input>
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Add Post
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

NewPostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPostAction(post)),
  };
};

export default connect(null, mapDispatchToProps)(NewPostModal);

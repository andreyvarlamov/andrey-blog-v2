import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setFilter as setFilterAction } from "../../redux/actions/postActions";

function PostDetailModal(props) {
  const { post, setFilter } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(prevModal => !prevModal);
  };

  return (
    <Fragment>
      <span
        onClick={() => {
          toggle();
        }}
        style={{ padding: "0" }}
        className="btn btn-link"
      >
        more
      </span>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{post.title}</ModalHeader>
        <ModalBody>
          <p
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "rgba(0, 0, 0, 0.125)",
              borderRadius: "1rem",
              padding: "0.8rem",
              maxHeight: "600px",
              overflow: "scroll",
            }}
          >
            {post.body}
          </p>
          <em>
            Posted on {new Date(post.date).toLocaleString()} by{" "}
            <span
              onClick={() => {
                setFilter({
                  id: post.postedBy._id,
                  name: post.postedBy.name,
                });
                toggle();
              }}
              style={{ padding: "0" }}
              className="btn btn-link"
            >
              {post.postedBy.name}
            </span>
          </em>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

PostDetailModal.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => {
      dispatch(setFilterAction(filter));
    },
  };
};

export default connect(null, mapDispatchToProps)(PostDetailModal);

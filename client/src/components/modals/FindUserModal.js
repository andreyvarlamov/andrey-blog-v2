import React, { Fragment, useState, useEffect } from "react";
import {
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserList as getUserListAction } from "../../redux/actions/userActions";
import { setFilter as setFilterAction } from "../../redux/actions/postActions";

function FindUserModal(props) {
  const [modal, setModal] = useState(false);

  const { users } = props.user;
  const { getUserList, setFilter } = props;

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line
  }, [modal]);

  const toggle = () => {
    setModal(prevModal => !prevModal);
  };

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        Find User
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Find User</ModalHeader>
        <ModalBody>
          <ListGroup style={{ maxHeight: "600px", overflow: "scroll" }}>
            {users.map(user => (
              <ListGroupItem
                action
                onClick={() => {
                  setFilter({ id: user._id, name: user.name });
                  toggle();
                }}
                style={{ cursor: "pointer" }}
                key={user._id}
              >
                {user.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

FindUserModal.propTypes = {
  user: PropTypes.object.isRequired,
  getUserList: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(getUserListAction());
    },
    setFilter: filter => {
      dispatch(setFilterAction(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindUserModal);

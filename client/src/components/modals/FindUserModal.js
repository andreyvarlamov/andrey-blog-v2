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

  // const fakeUsers = [
  //   { _id: "1", name: "poo poo" },
  //   { _id: "2", name: "poo poo" },
  //   { _id: "3", name: "poo poo" },
  //   { _id: "4", name: "poo poo" },
  //   { _id: "5", name: "poo poo" },
  //   { _id: "6", name: "poo poo" },
  //   { _id: "7", name: "poo poo" },
  //   { _id: "8", name: "poo poo" },
  //   { _id: "9", name: "poo poo" },
  //   { _id: "10", name: "poo poo" },
  //   { _id: "11", name: "poo poo" },
  //   { _id: "12", name: "poo poo" },
  //   { _id: "13", name: "poo poo" },
  //   { _id: "14", name: "poo poo" },
  //   { _id: "15", name: "poo poo" },
  //   { _id: "16", name: "poo poo" },
  //   { _id: "17", name: "poo poo" },
  //   { _id: "18", name: "poo poo" },
  //   { _id: "19", name: "poo poo" },
  //   { _id: "20", name: "poo poo" },
  //   { _id: "21", name: "poo poo" },
  //   { _id: "22", name: "poo poo" },
  //   { _id: "23", name: "poo poo" },
  //   { _id: "24", name: "poo poo" },
  //   { _id: "25", name: "poo poo" },
  //   { _id: "26", name: "poo poo" },
  //   { _id: "27", name: "poo poo" },
  //   { _id: "28", name: "poo poo" },
  // ];

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

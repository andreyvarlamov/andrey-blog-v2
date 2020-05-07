import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

import { logout as logoutAction } from "../../redux/actions/authActions";

function LogoutModal(props) {
  const [modal, setModal] = useState(false);

  const { isAuthenticated, logout } = props;

  const toggle = () => {
    setModal(prevModal => !prevModal);
  };

  useEffect(() => {
    //if modal is open and the user is finally authenticated, close it
    if (modal && !isAuthenticated) toggle();
    // eslint-disable-next-line
  }, [props]);

  const logoutClick = () => {
    logout();
  };

  return (
    <Fragment>
      <DropdownItem onClick={toggle} href="#">
        Logout
      </DropdownItem>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Logout</ModalHeader>
        <ModalBody>
          <p className="mb-3">Are you sure?</p>
          <Button color="dark" block onClick={logoutClick}>
            Click to Logout
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

LogoutModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch(logoutAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);

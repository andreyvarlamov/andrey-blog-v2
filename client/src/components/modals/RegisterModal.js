import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  NavLink,
  Alert,
} from "reactstrap";
import PropTypes from "prop-types";

import { register as registerAction } from "../../redux/actions/authActions";
import { clearErrors as clearErrorsAction } from "../../redux/actions/errorActions";

function RegisterModal(props) {
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMsg, setErrorMsg] = useState(null);

  const { error, isAuthenticated, register, clearErrors } = props;

  useEffect(() => {
    // set errorMsg stat if there is an error with id "REGISTER_ERROR"
    if (error.id === "REGISTER_ERROR") setErrorMsg(error.msg.msg);
    else setErrorMsg(null);

    //if modal is open and the user is finally authenticated, close it
    if (modal && isAuthenticated) toggle();
    // eslint-disable-next-line
  }, [props]);

  const toggle = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    clearErrors();
    setModal(prevModal => !prevModal);
  };

  const submitForm = e => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      password2,
    };

    register(data);
  };

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
          <Form onSubmit={submitForm}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={e => {
                  setName(e.target.value);
                }}
                value={name}
                className="mb-3"
              ></Input>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="mb-3"
              ></Input>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="mb-3"
              ></Input>
              <Label for="password2">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={e => {
                  setPassword2(e.target.value);
                }}
                value={password2}
                className="mb-3"
              ></Input>
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

RegisterModal.propTypes = {
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(registerAction(user)),
    clearErrors: () => dispatch(clearErrorsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);

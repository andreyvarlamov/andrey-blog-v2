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

import { login as loginAction } from "../../redux/actions/authActions";
import { clearErrors as clearErrorsAction } from "../../redux/actions/errorActions";

function LoginModal(props) {
  const [modal, setModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState(null);

  const { error, isAuthenticated, login, clearErrors } = props;

  useEffect(() => {
    // set errorMsg stat if there is an error with id "REGISTER_ERROR"
    if (error.id === "LOGIN_ERROR") setErrorMsg(error.msg.msg);
    else setErrorMsg(null);

    //if modal is open and the user is finally authenticated, close it
    if (modal && isAuthenticated) toggle();
    // eslint-disable-next-line
  }, [props]);

  const toggle = () => {
    setEmail("");
    setPassword("");
    clearErrors();
    setModal(prevModal => !prevModal);
  };

  const submitForm = e => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data);
  };

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
          <Form onSubmit={submitForm}>
            <FormGroup>
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
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

LoginModal.propTypes = {
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
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
    login: user => dispatch(loginAction(user)),
    clearErrors: () => dispatch(clearErrorsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

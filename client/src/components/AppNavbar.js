import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewPostModal from "./modals/NewPostModal";
import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";
import LogoutModal from "./modals/LogoutModal";
import MyPostsButton from "./MyPostsButton";
import FindUserModal from "./modals/FindUserModal";

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { user, isLoading } = props;

  const authItems = (
    <Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <strong>{user ? user.name : null}</strong>
        </DropdownToggle>
        <DropdownMenu right>
          <NewPostModal />
          <MyPostsButton />
          <LogoutModal />
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );

  const guestItems = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md" style={{ marginBottom: "2rem" }}>
        <Container>
          <NavbarBrand href="/">
            <img
              src={window.location.origin + "/icons8-book-64.png"}
              width="30"
              height="30"
              className="mr-2"
              alt="Book"
              style={{ borderRadius: "25px" }}
            ></img>
            bBlog
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <FindUserModal />
              {!isLoading ? (user ? authItems : guestItems) : null}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

AppNavbar.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, null)(AppNavbar);

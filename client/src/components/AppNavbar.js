import React, { useState } from "react";
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

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              <NavbarText>Test Text</NavbarText>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppNavbar;

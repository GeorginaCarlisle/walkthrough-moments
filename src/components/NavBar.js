import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../App';

const NavBar = () => {

  // Get currentUser data from the global context
  const currentUser = useContext(CurrentUserContext);

  // Set NavBar element to be displayed if user logged IN
  const loggedInIcons = <>{currentUser?.username}</>
  // Set NavBar elements to be displayed if user logged OUT
  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
        <i className='fas fa-sign-in-alt'></i>
        Sign in
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
        <i className='fas fa-user-plus'></i>
        Sign up
      </NavLink>
    </>
  )

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="Logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
                <i className='fas fa-home'></i>
                Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavBar;
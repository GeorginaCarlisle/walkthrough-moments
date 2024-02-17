import React, { useEffect, useRef, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUSer } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';

const NavBar = () => {

  // Get currentUser data from the global context
  const currentUser = useCurrentUser();

  // Get setCurrentUser function from the global context
  const setCurrentUser = useSetCurrentUSer();

  // false when mobile nav collapsed and true when it has been expanded
  const [expanded, setExpanded] = useState(false);

  // This will hold a reference to the toggle element once screen size drops
  const ref = useRef(null)

  /**
   *  Adds an event listener for mouse up on changes/rendering of the toggle element (identified through the use of ref which is only triggered for smaller screens).
   *  Handling of event listener checks if it is outside of the toggle element and if so changes expanded to false, which collapses the menu.
   *  Note: clicks on toggle are already programmed to collapse menu.
   *  A cleanup function removes the eventlistener when
   */ 
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("HandleClickOutsideCalled");
      if (ref.current && !ref.current.contains(event.target)){
        setExpanded(false)
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, [ref]);

  // Logic for display added within return statement
  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
      <i className='fas fa-plus-square'></i>
      Add post
    </NavLink>
  );

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch(err) {
      console.log(err);
    }
  };

  // Set NavBar elements to be displayed if user logged IN
  const loggedInIcons = <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
        <i className='fas fa-stream'></i>
        Feed
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/liked">
        <i className='fas fa-heart'></i>
        Liked
      </NavLink>
      <NavLink 
        className={styles.NavLink} 
        to="/"
        onClick={handleSignOut}
      >
        <i className='fas fa-sign-out-alt'></i>
        Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>

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
    <Navbar expanded={expanded} expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="Logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
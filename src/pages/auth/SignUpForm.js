import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect('loggedIn');
  // Below sets an object (signUpData) within the state, providing initial values and method by which it can be updated (setSignUpData)
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });
  // Below deconstructs the signUpData object to create three separate variables
  const { username, password1, password2 } = signUpData;
  // Below sets an empty object (errors) within the state and method by which it can be updated.
  const [errors, setErrors] = useState({});
  // Below useHistory is an imported hook that allows access to the history object which contains a stack of entries representing the user's navigation history within the application.
  const history = useHistory();

  // Below 'handle' is a common word given to functions which are called on activation of an event listener and handle what happens next
  const handleChange = (event) => {
    // Below method to update the signUpData called and first passed the current signupdata (using the spread operator) and then the new value to be added.
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * HandleSubmit is called when submit is clicked. Async key word used allowing await to be used within the function.
   * Page is prevented from re-loading. Try statement used in order to catch potential errors at this point.
   * Any error data within the response is passed into the errors variable within the state. The ? is used to prevent an error should err.response be undefined, instead passing undefined as the parameter.
   * Await used to pause the flow of the function until the post request is complete.
   * By pushing a new path onto the history stack, this automatically updates the URL and in effect navigates you to the new page.
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push('/signin');
    } catch(err){
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>))}
              
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>))}

            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
              Sign up
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>))}

          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;

import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route,Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostEditForm from './pages/posts/PostEditForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import CommentEditForm from './pages/comments/CommentEditForm';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  console.log("Current user has been identified...");
  console.log(currentUser);
  const profile_id = currentUser?.profile_id || "";
  console.log("Profile Id has been found....");
  console.log(profile_id);
  
  return (
    <div className={styles.App}>
      < NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => (<PostsPage message="No results found. Adjust the search keyword." />)} />
          <Route exact path="/feed" render={() => (
            <PostsPage
              message="No results found. Adjust the search keyword or follow a user." 
              filter={`owner__followed__owner__profile=${profile_id}&`}
            />
            )}
          />
          <Route exact path="/liked" render={() => (
            <PostsPage
              message="No results found. Adjust the search keyword or like a post." 
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
            />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={()=> <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/comments/:id/edit" render={() => <CommentEditForm /> } />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
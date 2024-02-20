import React from 'react'
import styles from '../../styles/Comment.module.css'
import { Media } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

const Comment = (props) => {
  const {
    id,
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    setComments,
    setPost,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/comments/${id}/edit`)
  }

  const handleDelete = async () => {
    console.log(id);  
    console.log(profile_id);
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count -1
        }]
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id)
      }));
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <hr/>
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className='align-self-center ml-2'>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
      </Media>
    </div>
  );
};

export default Comment
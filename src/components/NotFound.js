import React from 'react';
import styles from "../styles/NoResults.module.css";
import Asset from './Asset';
import NoResults from "../assets/no-results.png";

const NotFound = () => {
  return (
    <div className={styles.noresultscontainer}>
        <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound
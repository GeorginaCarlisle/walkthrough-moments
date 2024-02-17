import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, height = 45, text }) => {
    // below now included directly above where props would sit
    // const { src, height = 45, text } = props;
    return <span>
        <img className={styles.Avatar} src={src} height={height} width={height} alt="avatar" />
        {text}
    </span>;
};

export default Avatar
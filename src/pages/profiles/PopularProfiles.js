import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import appStyles from "../../App.module.css";
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(
          '/profiles/?ordering=-followers_count'
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
        setHasLoaded(true);
      } catch(err){
        console.log(err)
      }
    }
    handleMount();
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
        <p>Most followed profiles.</p>
        {hasLoaded ? (
          <>
            {popularProfiles.results.map(profile => (
              <p key={profile.id}>{profile.owner}</p>
            ))}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}

    </Container>
  )
}

export default PopularProfiles
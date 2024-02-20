import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import appStyles from "../../App.module.css";
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';

const PopularProfiles = ({mobile}) => {
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
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
        {hasLoaded ? (
          <>
            <p>Most followed profiles.</p>
            {mobile ? (
              <div className='d-flex justify-content-around'>
                {popularProfiles.results.slice(0,4).map((profile) => (
                  <p key={profile.id}>{profile.owner}</p>
                ))}
              </div>
            ) : (
              popularProfiles.results.map((profile) => (
                <p key={profile.id}>{profile.owner}</p>
              ))
            )}
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
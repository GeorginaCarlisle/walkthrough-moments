import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from "axios";
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Below adds the currentUserContext (currentUser passed in as part of the return statement) to the global context (which can then be accessed by all children of app.js).
export const CurrentUserContext = createContext();
// Below adds the setCurrentUserContext (setCurrentUser function passed in as part of the return statement) to the global context.
export const SetCurrentUserContext = createContext();

// Below functions are then pulled into components where these functionalities are required.
export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUSer = () => useContext(SetCurrentUserContext)

// This function is then pulled into index.js and used to wrap the App component
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory;

  // below response from get request destructured to pull data (and data only) from the reponse
  const handleMount = async () => {
    try {
      const {data} = await axiosRes.get('dj-rest-auth/user/');
      console.log("User data aquired:");
      console.log(data);
      setCurrentUser(data);
    } catch(err) {
      console.log("Error in getting current user. Error details are:")
      console.log(err);
    }
  };

  // 
  useEffect(() => {
    handleMount()
  }, []);

  // Below contains all logic needed for the axios interceptors
  useMemo(() => {
    axiosReq.interceptors.request.use(
        async (config) => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/')
            } catch(err){
                setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                        history.push('/signin')
                    }
                    return null
                })
                return config
            }
            return config
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    axiosRes.interceptors.response.use(
        (response) => response,
            async (err) => {
                if (err.response?.status === 401){
                    try{
                        await axios.post('/dj-rest-auth/token/refresh/')
                    } catch(err){
                        setCurrentUser(prevCurrentUser => {
                            if (prevCurrentUser){
                                history.push('/signin')
                            }
                            return null
                        })
                    }
                    return axios(err.config)
                }
                return Promise.reject(err)
            }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}
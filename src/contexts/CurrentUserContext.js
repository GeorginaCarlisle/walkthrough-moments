import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";

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

  // below response from get request destructured to pull data (and data only) from the reponse
  const handleMount = async () => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
      console.log("Current user is:")
      console.log(currentUser);
    } catch(err) {
      console.log("Error in getting current user. Error details are:")
      console.log(err);
    }
  };

  // 
  useEffect(() => {
    handleMount()
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
            {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}
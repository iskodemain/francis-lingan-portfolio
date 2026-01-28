import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProfileContext = createContext();
const ProfileContextProvider = (props) => {
    const navigate = useNavigate();
    const value = {
        navigate
    }
  return (
    <ProfileContext.Provider value={value}>
        {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider

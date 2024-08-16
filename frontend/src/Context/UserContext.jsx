import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};

// Context provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const updateUser = (key, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: value,
        }));
    };

    const resetUser = () => {
        setUser({});
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenModal = (message) => {
        setErrorMessage(message);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <UserContext.Provider value={{ user,setUser , updateUser, resetUser ,isModalOpen,errorMessage,handleOpenModal,handleCloseModal}}>
            {children}
        </UserContext.Provider>
    );
};

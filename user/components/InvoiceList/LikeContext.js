import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'likeStates';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likeStates, setLikeStates] = useState({});

    useEffect(() => {
        const loadLikeStates = async () => {
            try {
                const storedLikeStates = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedLikeStates !== null) {
                    setLikeStates(JSON.parse(storedLikeStates));
                }
            } catch (error) {
                console.error('Error loading likeStates from AsyncStorage:', error);
            }
        };

        loadLikeStates();
    }, []);

    const handleLikeToggle = (itemId) => {
        setLikeStates((prevLikeStates) => {
            const newLikeStates = { ...prevLikeStates, [itemId]: !prevLikeStates[itemId] };
            saveLikeStates(newLikeStates);
            return newLikeStates;
        });
    };

    const saveLikeStates = async (likeStates) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(likeStates));
        } catch (error) {
            console.error('Error saving likeStates to AsyncStorage:', error);
        }
    };

    return <LikeContext.Provider value={{ likeStates, handleLikeToggle }}>{children}</LikeContext.Provider>;
};

export const useLike = () => {
    return useContext(LikeContext);
};

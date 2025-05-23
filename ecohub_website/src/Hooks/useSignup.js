import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, username) => {
        if (!email || !password || !username) {
            console.log('fields not fully filled out');
            setError('All fields must be filled out');
            return { error: 'All fields must be filled out' };
        }

        setIsLoading(true);
        setError(null);
        console.log(JSON.stringify({ email, password, username}));

        const response = await fetch('/api/users/signup', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return { error: json.error };
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            localStorage.setItem('userId', json.userId);
            console.log(localStorage.getItem('userId'));

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { GetCurrentUser } from '../api/user';
import { setUser } from '../redux/userSlice';
import { message } from 'antd';


const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const getValidUser = async () => {
        try {
            dispatch(showLoading());
            const response = await GetCurrentUser();
            dispatch(setUser(response?.data))
            dispatch(hideLoading());
        } catch (error) {
            message.error(error);
            dispatch(hideLoading());
        } finally {
            dispatch(hideLoading());
        }
    }

    useEffect(() => {
        if (localStorage.getItem('tokenForBMS')) {
            getValidUser();
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute
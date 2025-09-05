import axios from 'axios'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
export default function useAxiosSecure() {
    const { passwordSignOut, loding } = useAuth()
    const usenavigate = useNavigate()

    
    axiosSecure.interceptors.request.use( function (config) {
       
         const token =  localStorage?.getItem('access-token')
        console.log('stope', token)
       
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })


    //intercept 401 and 403
    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status
        if (status == 401 || status == 403) {
            await passwordSignOut()
            usenavigate('/login')
        }
        return Promise.reject(error);
    });

    return axiosSecure
}


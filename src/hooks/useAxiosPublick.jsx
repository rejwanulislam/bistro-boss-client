import axios from "axios"

const axiosPublick = axios.create({
  baseURL: 'http://localhost:5000'
})
export default function useAxiosPublick() {
  return axiosPublick;
}


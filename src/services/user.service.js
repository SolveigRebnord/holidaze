import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'https://nf-api.onrender.com/api/v1/holidaze/';

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};



const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService
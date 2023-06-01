import axios from "axios";

const API_URL = "https://nf-api.onrender.com/api/v1/holidaze/auth/";


const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name: name,
    email: email,
    avatar:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
    venueManager: false,
    password: password,
  });
};

const login = async (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

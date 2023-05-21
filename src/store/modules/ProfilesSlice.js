import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";

const ProfilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    singleProfile: null,
  },
  reducers: {
    SET_PROFILES: (state, action) => {
      state.profiles = action.payload;
    },
    SET_SINGLE_PROFILE: (state, action) => {
      state.singleProfile = action.payload;
    },
  },
});

export default ProfilesSlice.reducer;

const { SET_PROFILES, SET_SINGLE_PROFILE } = ProfilesSlice.actions;

const header = authHeader();

export const getProfiles = () => async (dispatch) => {
  axios({
    method: "get",
    url: "https://nf-api.onrender.com/api/v1/holidaze/profiles?_bookings=true&_venues=true&_limit=50",
    headers: header,
  })
    .then(function (response) {
      let data = response.data;

      dispatch(SET_PROFILES(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSingleProfile = (name) => async (dispatch) => {
  axios({
    method: "get",
    url: `https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true&_limit=50`,
    headers: header,
  })
    .then(function (response) {
      let data = response.data;
      console.log(data);
      dispatch(SET_SINGLE_PROFILE(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";
import { setError } from "./ErrorSlice";

const ProfilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    singleProfile: null,
    venueManager: false
  },
  reducers: {
    SET_PROFILES: (state, action) => {
      state.profiles = action.payload;
    },
    SET_SINGLE_PROFILE: (state, action) => {
      state.singleProfile = action.payload;
    },
    EDIT_PROFILE: (state, action) => {
      state.singleProfile = action.payload;
    },
    IS_VENUEMANAGER: (state, action) => {
      state.venueManager = action.payload;
    },

  },
});

export default ProfilesSlice.reducer;

const { SET_PROFILES, SET_SINGLE_PROFILE, EDIT_PROFILE, IS_VENUEMANAGER } = ProfilesSlice.actions;

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
      return (error)
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
      data.venues.length >= 1 ? dispatch(isVenueManager(data.name, true)) : dispatch(isVenueManager(data.name, false))
    })
    .catch(function (error) {
      console.log(error);
    });
};


export const editProfile = (name, img) => async (dispatch) => {

  let body = {'avatar': img}

 await axios.put(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/media`, body, {
    headers: header
})
    .then(function (response) {
      //hvordan få vekk preventDefault her?
      let data = response.data;
      dispatch(EDIT_PROFILE(data));
     
    })
    .catch(function (error) {
      dispatch(setError(true,error.message))
      console.log(error);
    });
 
};

export const isVenueManager = (name, bool) => async (dispatch) => {

  let body = {'venueManager': bool}

 await axios.put(`https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}`, body, {
    headers: header
})
    .then(function (response) {
      //hvordan få vekk preventDefault her?
      let data = response.data;
      dispatch(IS_VENUEMANAGER(data));
     
    })
    .catch(function (error) {
      dispatch(setError(true,error.message))
      console.log(error);
    });
 
};

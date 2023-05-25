import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";

const venuesSlice = createSlice({
  name: "venues",
  initialState: {
    venues: [],
    singleVenue: null,
  },
  reducers: {
    SET_VENUES: (state, action) => {
      state.venues = action.payload;
    },
    SET_SINGLE_VENUE: (state, action) => {
      state.singleVenue = action.payload;
    },
    NEW_VENUE: (state, action) => {
      state.singleVenue = action.payload;
    }
  },
});

export default venuesSlice.reducer;

const { SET_VENUES, SET_SINGLE_VENUE, NEW_VENUE } = venuesSlice.actions;

const header = authHeader();

export const getVenues = () => async (dispatch) => {
  axios({
    method: "get",
    url: "https://nf-api.onrender.com/api/v1/holidaze/venues?limit=50",
  })
    .then(function (response) {
      let data = response.data;

      dispatch(SET_VENUES(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSingleVenue = (id) => async (dispatch) => {
  axios({
    method: "get",
    url: `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
  })
    .then(function (response) {
      let data = response.data;
      console.log(data);

      dispatch(SET_SINGLE_VENUE(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};


export const addNewVenue = (venueObject) => async (dispatch) => {

  let body = venueObject

 await axios.post("https://nf-api.onrender.com/api/v1/holidaze/venues", body, {
    headers: header
})
    .then(function (response) {
      //hvordan få vekk preventDefault her?
      let data = response.data;
      //dispatch(EDIT_PROFILE(data));
     
    })
    .catch(function (error) {
      console.log(error);
    });
 
};
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";

const venuesSlice = createSlice({
  name: "venues",
  initialState: {
    venues: [],
    singleVenue: null,
    filteredVenues: [],
  },
  reducers: {
    SET_VENUES: (state, action) => {
      state.venues = action.payload;
    },
    SET_FILTERED_VENUES: (state, action) => {
      state.filteredVenues = action.payload;
    },
    SET_SINGLE_VENUE: (state, action) => {
      state.singleVenue = action.payload;
    },
    NEW_VENUE: (state, action) => {
      state.singleVenue = action.payload;
    },
    EDIT_VENUE: (state, action) => {
      state.singleVenue = action.payload;
    },
  },
});

export default venuesSlice.reducer;

const {
  SET_VENUES,
  SET_SINGLE_VENUE,
  NEW_VENUE,
  EDIT_VENUE,
  SET_FILTERED_VENUES,
} = venuesSlice.actions;

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

export const getFilteredVenues = (filter) => async (dispatch) => {
  axios({
    method: "get",
    url: `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=50&sort=${filter}`,
  })
    .then(function (response) {
      let data = response.data;
      console.log(data);
      let filtered = data.filter((item) => {
        return item.maxGuests < 5;
      });
      dispatch(SET_FILTERED_VENUES(filtered));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const searchVenues = (search) => async (dispatch) => {
  axios({
    method: "get",
    url: `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=50`,
  })
    .then(function (response) {
      let data = response.data;
      console.log(search);
      let filtered = data.filter((item) => {
        return item.maxGuests >= search.guests;
        // there would be filter as to if the venue is available at this time in a real project
      });
      dispatch(SET_FILTERED_VENUES(filtered));
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
  let body = venueObject;

  await axios
    .post("https://nf-api.onrender.com/api/v1/holidaze/venues", body, {
      headers: header,
    })
    .then(function (response) {
      //hvordan få vekk preventDefault her?
      let data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editVenue = (id, venueObject) => async (dispatch) => {
  let body = venueObject;

  await axios
    .put(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`, body, {
      headers: header,
    })
    .then(function (response) {
      //hvordan få vekk preventDefault her?
      let data = response.data;
      dispatch(EDIT_VENUE(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteVenue = (id) => async (dispatch) => {
  await axios
    .delete(`https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`, {
      headers: header,
    })
    .then(function (response) {
      let data = response.data;
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

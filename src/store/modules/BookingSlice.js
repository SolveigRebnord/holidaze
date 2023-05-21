import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";

const BookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    singleBooking: null,
    filteredBookings: [],
  },
  reducers: {
    SET_BOOKINGS: (state, action) => {
      state.bookings = action.payload;
    },
    SET_SINGLE_BOOKING: (state, action) => {
      state.singleBooking = action.payload;
    },
    SET_FILTERED_BOOKINGS: (state, action) => {
      state.searchedProducts = action.payload;
    },
  },
});

export default BookingSlice.reducer;

const { SET_BOOKINGS, SET_SINGLE_BOOKING, SET_FILTERED_BOOKINGS } =
  BookingSlice.actions;

const header = authHeader();
console.log(header);

export const getBookings = () => async (dispatch) => {
  axios({
    method: "get",
    url: "https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_owner=true&_venue=true",
    headers: header,
  })
    .then(function (response) {
      let data = response.data;

      dispatch(SET_BOOKINGS(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSingleBooking = (id) => async (dispatch) => {
  axios({
    method: "get",
    url: `https://nf-api.onrender.com/api/v1/holidaze/bookings/${id}`,
    headers: header,
  })
    .then(function (response) {
      let data = response.data;
      console.log(data);

      dispatch(SET_SINGLE_BOOKING(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getFilteredBookings = (filter) => (dispatch) => {
  axios({
    method: "get",
    url: "https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_owner=true&_venue=true",
    headers: header,
  })
    .then(function (response) {
      let data = response.data;

      /*
      const filteredData = searchedProducts.filter((el) => {
        if (props.input === "") {
          return el;
        } else {
          return el.title.toLowerCase().includes(props.input);
        }
      });
      console.log(filteredData.length);*/

      dispatch(SET_FILTERED_BOOKINGS(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

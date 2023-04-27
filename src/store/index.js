import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import VenueSlice from "./modules/VenueSlice";
import BookingSlice from "./modules/BookingSlice";
import AuthSlice from "./modules/AuthSlice";
import ProfilesSlice from "./modules/ProfilesSlice";

const reducer = combineReducers({
    venues: VenueSlice,
    bookings: BookingSlice,
    auth: AuthSlice,
    profiles: ProfilesSlice
});
const index = configureStore({
  reducer,
});
export default index;
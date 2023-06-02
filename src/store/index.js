import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import VenueSlice from "./modules/VenueSlice";
import BookingSlice from "./modules/BookingSlice";
import AuthSlice from "./modules/AuthSlice";
import ProfilesSlice from "./modules/ProfilesSlice";
import MenuSlice from "./modules/MenuSlice";
import ErrorSlice from "./modules/ErrorSlice";

const reducer = combineReducers({
  venues: VenueSlice,
  bookings: BookingSlice,
  auth: AuthSlice,
  profiles: ProfilesSlice,
  menu: MenuSlice,
  error: ErrorSlice,
});
const index = configureStore({
  reducer,
});
export default index;

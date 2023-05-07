import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    menu1: false,
    menu2: false, 
    menu3: false,
}

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    SET_MENU_ITEM: (state, action) => {



            console.log(action.payload)

      },
  },
})

export const { SET_MENU_ITEM } = MenuSlice.actions
export default MenuSlice.reducer


export const clickMenu = (item) => (dispatch) => {
  
        dispatch(SET_MENU_ITEM(item));
    
  };
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice"
import cartSliceReducer from "./features/cart/cartSlice" //we can import it as anyName we want 

const store = configureStore({
  reducer : {
    user : userReducer,
    cart : cartSliceReducer,
  }
})

export default store
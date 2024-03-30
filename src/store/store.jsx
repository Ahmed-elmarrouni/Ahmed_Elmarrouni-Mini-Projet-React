import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import cartSlice from "../reducers/cartSlice";

const rootReducer = combineReducers({
    cart: cartSlice,
});

const store = createStore(
    rootReducer,
    composeWithDevTools()
);


export default store;


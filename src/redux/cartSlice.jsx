import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    isDrawerOpen: false,
    cartDetails: {
        cartItems: [],
        cartCount: 0,  // Total number of items in the cart
        totalPrice: 0, // Total price of the items in the cart
    }
};

// Create slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleDrawer(state, action) {
            state.isDrawerOpen = action.payload;
        },
        addItemToCart(state, action) {
            const exists = state.cartDetails.cartItems.find(i => i.barCode === action.payload.barCode);
            if (!exists) {
                state.cartDetails.cartItems.push(action.payload)
                state.cartDetails.cartCount = state.cartDetails.cartItems.length;
                state.cartDetails.totalPrice = calculateTotalPrice(state.cartDetails.cartItems);
            }
        },
        removeItem(state, action) {
                state.cartDetails.cartItems = state.cartDetails.cartItems.filter(
                    (item) => item.barCode !== action.payload.barCode
                );
            state.cartDetails.cartCount = state.cartDetails.cartItems.length;
            state.cartDetails.totalPrice = calculateTotalPrice(state.cartDetails.cartItems);
        },
        resetCart: () => initialState
    }
});


// Helper function to calculate the total price of the cart
const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce(
        (total, item) => total + item.offeredCourseFeeDto[0].courseFee,
        0
    );
};

export const {
    toggleDrawer,
    addItemToCart,
    removeItem,
    resetCart
} = cartSlice.actions;

export default cartSlice.reducer;

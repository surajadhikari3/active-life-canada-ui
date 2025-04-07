import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    isDrawerOpen: false,
    cartItems: [],
    cartCount: 0,  // Total number of items in the cart
    totalPrice: 0, // Total price of the items in the cart
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
            const item = state.cartItems.find((i) => i.barCode === action.payload.barCode);
            const price = action.payload.offeredCourseFeeDto[0].courseFee;
            if(!item){
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                    total: price
                })
            } else{
                item.quantity += 1;
                item.total = (item.quantity + 1) * price
            }
            state.cartCount = calculateCartCount(state.cartItems);
            state.totalPrice = calculateTotalPrice(state.cartItems);
        },
        removeItem(state, action) {
            const item = state.cartItems.find((i) => i.barCode === action.payload.barCode);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else{
                state.cartItems = state.cartItems.filter(
                    (item) => item.barCode !== action.payload.barCode
                );
            }
            state.cartCount = calculateCartCount(state.cartItems);
            state.totalPrice = calculateTotalPrice(state.cartItems);
        }
    },
});

// Helper function to calculate the total cart count
const calculateCartCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Helper function to calculate the total price of the cart
const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce(
        (total, item) => total + item.quantity * item.offeredCourseFeeDto[0].courseFee,
        0
    );
};

export const {
    toggleDrawer,
    addItemToCart,
    removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;

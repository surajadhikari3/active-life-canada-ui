import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "@/redux/cartSlice.jsx";
import { motion } from "framer-motion";

const CartIcon = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const setDrawer = () => {
        dispatch(toggleDrawer(!cart.isDrawerOpen));
    };

    return (
        <motion.div
            animate={{
                x: cart?.isDrawerOpen ? 100 : 0, // slide to right on open
                opacity: cart?.isDrawerOpen ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                position: "fixed",
                top: 13,
                right: 30,
                zIndex: 1301,
            }}
        >
            <IconButton
                onClick={setDrawer}
                style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    borderRadius: "50%",
                }}
            >
                <Badge badgeContent={cart?.cartDetails?.cartCount} color="primary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </motion.div>
    );
};

export default CartIcon;

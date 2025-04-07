import React from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    Divider,
    Typography,
    Box,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {addItemToCart, removeItem, toggleDrawer} from "@/redux/cartSlice.jsx";
import { motion } from "framer-motion";


const CartDrawer = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const setDrawer = () => {
        dispatch(toggleDrawer(!cart.isDrawerOpen));
    };

    const handleIncrement = (itemId) => {
        dispatch(addItemToCart(itemId)); // Increment quantity
    };

    const handleDecrement = (itemId) => {
        dispatch(removeItem(itemId)); // Decrement quantity
    };

    return (
        <Drawer
            anchor="right"
            open={cart?.isDrawerOpen}
            onClose={setDrawer}
            transitionDuration={400}
        >
            <Box sx={{ width: 350, padding: 2, position: "relative" }}>
                {/* Close Icon */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: "absolute", top: 10, right: 10 }}
                >
                    <IconButton onClick={setDrawer}>
                        <CloseIcon />
                    </IconButton>
                </motion.div>

                <Typography variant="h5" gutterBottom>Your Cart</Typography>
                <Divider sx={{ mb: 2 }} />

                <List>
                    {cart?.cartItems?.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <ListItem alignItems="flex-start">
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.course?.name || "Course Title"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Barcode: {item.barCode}
                                    </Typography>
                                    <Typography variant="body2">
                                        Price: ${item?.offeredCourseFeeDto?.[0]?.courseFee || "N/A"}
                                    </Typography>

                                    {/* Quantity and increment/decrement buttons */}
                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDecrement(item)}
                                            disabled={item.quantity <= 0} // Prevent negative quantity
                                        >
                                            -
                                        </Button>
                                        <Typography variant="body1" sx={{ mx: 2 }}>
                                            {item.quantity} {/* Display the current quantity */}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleIncrement(item)}
                                        >
                                            +
                                        </Button>
                                    </Box>
                                </Box>
                            </ListItem>
                            <Divider sx={{ my: 1 }} />
                        </motion.div>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default CartDrawer;

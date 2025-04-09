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
import {removeItem, resetCart, toggleDrawer} from "@/redux/cartSlice.jsx";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import axiosInstance from "@/axios/axiosInstance.js";
import {toast} from "react-toastify";


const CartDrawer = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const authentication = useSelector((state) => state.authentication);

    const setDrawer = () => {
        dispatch(toggleDrawer(!cart.isDrawerOpen));
    };

    const handleDecrement = (itemId) => {
        dispatch(removeItem(itemId)); // Decrement quantity
    };

    const courseRegistration = async () => {
        console.log("cart", cart);
        try {
            const response = await axiosInstance.post(
                "/cart",
                JSON.stringify(cart?.cartDetails),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-family-member-id": authentication?.memberLoginId
                    }
                }
            );

            const data = response?.data;
            if (data) {
                dispatch(resetCart());
                toast.success("Successfully registered to the course");
            }
            console.log("data", data);
        } catch (error) {
            console.error("Error during course registration:", error);

            // Check if it's an Axios error with a response
            if (error.response) {
                const errorMessage =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    "Something went wrong while registering for the course";
                toast.error(errorMessage);
            } else {
                // Network error or unexpected issue
                toast.error("Network error or server is not responding.");
            }
        }
    };

    function removeFromCart(item) {
        dispatch(removeItem(item))
        toast.success("Items removed from cart")
    }

    return (

        <Drawer
            anchor="right"
            open={cart?.isDrawerOpen}
            onClose={setDrawer}
            transitionDuration={400}
            PaperProps={{
                sx: {
                    width: 400,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    boxShadow: 5,
                    backgroundColor: "#fafafa", // Soft background
                    borderLeft: "4px solid #1976d2", // Accent border
                }
            }}
        >
            <Box sx={{padding: 3, height: "100%", position: "relative", display: "flex", flexDirection: "column"}}>
                {/* Close Icon */}
                <motion.div
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.4}}
                    style={{position: "absolute", top: 10, right: 10}}
                >
                    <IconButton onClick={setDrawer}>
                        <CloseIcon/>
                    </IconButton>
                </motion.div>

                <Typography variant="h5" gutterBottom fontWeight="bold" mt={1}>
                    Your Cart
                </Typography>
                <Divider sx={{mb: 2}}/>

                <List sx={{flexGrow: 1, overflowY: "auto"}}>
                    {cart?.cartDetails?.cartItems?.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.4, delay: index * 0.1}}
                        >
                            <ListItem alignItems="flex-start">
                                <Box sx={{
                                    flex: 1,
                                    background: "#fff",
                                    borderRadius: 2,
                                    padding: 2,
                                    boxShadow: 1,
                                }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item?.courseName || "Course Title"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Barcode: {item.barCode}
                                    </Typography>
                                    <Typography variant="body2">
                                        Price: ${item?.offeredCourseFeeDto?.[0]?.courseFee || "N/A"}
                                    </Typography>

                                    {/* Delete button */}
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 2
                                    }}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDecrement(item)}
                                            disabled={item.quantity <= 0}
                                            sx={{
                                                minWidth: 56,
                                                height: 56,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 0,
                                            }}
                                        >
                                            <MdDeleteForever
                                                onClick={() => removeFromCart(item)}
                                                size={28}
                                                style={{cursor: "pointer"}}
                                            />
                                        </Button>
                                    </Box>
                                </Box>
                            </ListItem>
                            <Divider sx={{my: 1}}/>
                        </motion.div>
                    ))}
                </List>
            </Box>
            <button onClick={() => courseRegistration()} type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 18 21">
                    <path
                        d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
               Proceed To Checkout
            </button>
        </Drawer>

    );
};

export default CartDrawer;

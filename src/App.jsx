import './App.css'
import {Provider} from "react-redux";
import store from "./store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Login2FAForm from "./components/Login2FAForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Navbar from "./components/Navbar.jsx";
import CourseCard from "./components/CourseCard.jsx";
import CourseDetails from "./components/CourseDetails.jsx";
import LandingPage from "./components/LandingPage.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleDashboard from "@/components/dashboard/Dashboard.jsx";
import {AddMemberModal} from "@/components/addMemberModal.jsx";
import CartDrawer from "@/components/cart/CartDrawer.jsx";
import FamilyMember from "@/components/dashboard/FamilyMember.jsx";
import DashboardLayout from "@/components/dashboard/DashboardLayout.jsx";
import CourseRegistration from "@/components/dashboard/CourseRegistration.jsx";

function App() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="flex flex-col min-h-screen">
                    <Navbar/>
                    <ToastContainer />
                    <div className="flex-grow mt-20 px-6">
                        <CartDrawer/>
                        {/*Default toaster config that all the component will use..*/}
                        <ToastContainer
                            autoClose={1000}
                            hideProgressBar={true}
                            position="top-right"
                            pauseOnHover={true}
                            closeOnClick={true}
                            newestOnTop={true}
                        />
                            <Routes>
                                <Route path="/" element={<LandingPage/>}/>
                                <Route path="/addMember" element={<AddMemberModal/>}/>
                                <Route path="/signup" element={<SignUpForm/>}/>
                                <Route path="/login" element={<LoginForm/>}/>
                                <Route path="/login2FA" element={<Login2FAForm/>}/>
                                <Route path="/course" element={<CourseCard/>}/>
                                <Route path="/course/details" element={<CourseDetails/>}/>

                                {/* Dashboard layout and nested routes for dashboard */}
                                <Route path="/dashboard" element={<DashboardLayout />}>
                                    <Route path="family" element={<FamilyMember />} />
                                    <Route path="home" element={<SimpleDashboard />} />
                                    <Route path="course-registration" element={< CourseRegistration/>} />
                                </Route>
                            </Routes>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App

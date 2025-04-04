import './App.css'
import {Provider} from "react-redux";
import store from "./store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router";
import Login2FAForm from "./components/Login2FAForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Navbar from "./components/Navbar.jsx";
import CourseCard from "./components/CourseCard.jsx";
import CourseDetails from "./components/CourseDetails.jsx";
import LandingPage from "./components/LandingPage.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="flex flex-col min-h-screen">
                    <Navbar/>
                    <ToastContainer />
                    <div className="flex-grow mt-20 px-6">
                            <Routes>
                                <Route path="/" element={<LandingPage/>}/>
                                <Route path="/signup" element={<SignUpForm/>}/>
                                <Route path="/login" element={<LoginForm/>}/>
                                <Route path="/login2FA" element={<Login2FAForm/>}/>
                                <Route path="/course" element={<CourseCard/>}/>
                                <Route path="/course/details" element={<CourseDetails/>}/>
                            </Routes>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App

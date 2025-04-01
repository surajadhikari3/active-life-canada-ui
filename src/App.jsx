import './App.css'
import {Provider} from "react-redux";
import store from "./store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router";
import Login2FAForm from "./components/Login2FAForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Navbar from "./components/navbar.jsx";
import CourseCard from "./components/CourseCard.jsx";

function App() {

    return (

        <Provider store={store}>
            <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow mt-20 px-6">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignUpForm/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/login2FA" element={<Login2FAForm/>}/>
                        <Route path="/course" element={<CourseCard/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            </div>
        </Provider>
    )
}

export default App

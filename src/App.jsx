import './App.css'
import {Provider} from "react-redux";
import store from "./store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router";
import Login2FAForm from "./components/Login2FAForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {

    return (

        <Provider store={store}>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignUpForm/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/login2FA" element={<Login2FAForm/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}

export default App


import './App.css'
import SignUpForm from "./components/SignUpForm.jsx";
import {Provider} from "react-redux";
import store from "./store/store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <SignUpForm/>
        </div>
    </Provider>
  )
}

export default App

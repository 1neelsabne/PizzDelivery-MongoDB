//import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogOut from "./components/LogOut";
import CartDash from "./pages/CartDash";
import HomeDash from "./pages/HomeDash";
import LogIN from "./pages/LogIN";
import OrderDash from "./pages/OrderDash";
import PizzaDash from "./pages/PizzaDash";
import SignUP from "./pages/SignUP";
import SuccessDash from "./pages/SuccessDash";

function App() {
    //const [user, setUserflag] = useState();
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LogIN />} />
                    <Route path="/profile" element={<HomeDash />} />
                    <Route path="/cart" element={<CartDash />} />
                    <Route path="/pizzadash" element={<PizzaDash />} />
                    <Route path="/success" element={<SuccessDash />} />
                    <Route path="/orders" element={<OrderDash />} />
                    <Route path="/signup" element={<SignUP />} />
                    <Route path="/logout" element={<LogOut />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

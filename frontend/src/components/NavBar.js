import React from "react";
import { Nav, Navbar } from "react-bootstrap";

let cartItems = JSON.parse(localStorage.getItem("mycart"));
let lenn;
if (cartItems) {
    lenn = cartItems.length;
} else {
    lenn = 0;
}

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">CrazyCheesy</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/pizzadash">Pizza's</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <Nav.Link href="/cart">Pizza Cart ({lenn})</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link href="/profile" className="text-warning">
                        Profile
                    </Nav.Link>
                    <Nav.Link href="/logout" className="text-danger">
                        Log Out
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}

export default NavBar;

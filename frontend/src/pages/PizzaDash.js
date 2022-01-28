import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PizzaDash() {
    const [pizza, setPizza] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8888/getpizza").then((res) => {
            setPizza(res.data);
        });
    }, []);

    console.warn(pizza);

    const pizzaData = (itemm) => {
        //console.log(item);
        //console.log(obj.name);
        let item = {
            _id: itemm._id,
            name: itemm.pname,
            price: itemm.price,
            quantity: itemm.quantity,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            // Get list of all ids
            arr.forEach((data) => {
                idArrays.push(data._id);
            });

            if (idArrays.includes(itemm._id)) {
                toast.error("Already Added, Visit Cart", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
                // setItemadded(true);
            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                toast.success("Added to the Cart", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "dark",
                });
                // this.setState({ len: this.state.len + 1 });
            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            toast.success("Added to the Cart", {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
            // this.setState({ len: this.state.len + 1 });
        }
    };

    return (
        <>
            <NavBar />
            <Container className="text-center">
                <br />
                <h1>Pizza's</h1>
                <br />
                <Row>
                    {pizza.map((item, index) => {
                        return (
                            <Col key={index} className="mb-4">
                                <Card
                                    style={{ width: "15rem", height: "auto" }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={item.image}
                                        height="180px"
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.pname}</Card.Title>
                                        <Card.Text className="text-danger">
                                            {" "}
                                            &#8377; {item.price}
                                        </Card.Text>
                                        <Button
                                            type="submit"
                                            onClick={() => pizzaData(item)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <ToastContainer newestOnTop />
        </>
    );
}

export default PizzaDash;

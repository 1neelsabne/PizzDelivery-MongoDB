import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Table,
    Form,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartDash() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    let total = [0];

    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
            // setCart(cart.filter((item) => item._id !== product._id));
        } else {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
        toast.success("Removed Successfully", {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        });
    };

    const checkout = () => {
        console.log(cart);
        let cardno = document.getElementById("card").value;
        let un = JSON.parse(localStorage.getItem("user"));
        let checkout = {
            orderuser: un.email,
            cardnumber: cardno,
            total: total.reduce((result, number) => result + number),
        };
        console.log(checkout);
        axios
            .post("http://localhost:8888/cartdetails", checkout)
            .then((res) => {
                if (res.data.flag === 1) {
                    console.log(res.data.msg);
                    localStorage.removeItem("mycart");
                    navigate("/success");
                }
            });
    };

    return (
        <>
            <NavBar />
            <br />
            <Container className="text-center">
                <br />
                <h2>Pizza's Cart</h2>
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart
                            ? cart.map((value, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{value.name}</td>
                                          <td>{value.price}</td>
                                          <td>
                                              <Row>
                                                  <Col>
                                                      <Button
                                                          variant="warning"
                                                          onClick={() =>
                                                              onRemove(value)
                                                          }
                                                      >
                                                          -
                                                      </Button>
                                                  </Col>
                                                  <Col>
                                                      <Form.Control
                                                          type="number"
                                                          placeholder="Enter quantity"
                                                          min="1"
                                                          max="20"
                                                          value={value.quantity}
                                                      />
                                                  </Col>
                                                  <Col>
                                                      <Button
                                                          variant="warning"
                                                          onClick={() =>
                                                              onAdd(value)
                                                          }
                                                      >
                                                          +
                                                      </Button>
                                                  </Col>
                                              </Row>
                                          </td>
                                          <td>
                                              {value.quantity * value.price}
                                          </td>
                                          <td>
                                              <Button
                                                  variant="danger"
                                                  onClick={() =>
                                                      onDelete(index)
                                                  }
                                              >
                                                  Delete
                                              </Button>
                                          </td>
                                          {console.log(
                                              total.push(
                                                  value.price * value.quantity
                                              )
                                          )}
                                      </tr>
                                  );
                              })
                            : ""}
                    </tbody>
                </Table>
                <h4 className="text-right">
                    Total Amount:{" "}
                    {total.reduce((result, number) => result + number)}
                </h4>
                <br />
                <Card style={{ padding: "30px" }}>
                    <Form.Label>
                        <h3>Credit Card Number</h3>
                    </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter credit card details"
                        id="card"
                        required
                    />
                    <br />
                    <Button variant="success" onClick={() => checkout()}>
                        Checkout
                    </Button>
                </Card>
            </Container>
            <ToastContainer newestOnTop />
        </>
    );
}

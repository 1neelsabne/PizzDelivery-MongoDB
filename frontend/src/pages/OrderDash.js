import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function OrderDash() {
    const [order1, setOrder1] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8888/getorder").then((res) => {
            console.log(res.data.total);
            setOrder1(res.data);
        });
    }, []);
    console.log(order1.cardnumber);
    return (
        <div>
            <NavBar />
            <Container className="text-center">
                <br />
                <h1>Order History</h1>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>User Name</th>
                            <th>Card Number</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order1.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.orderuser}</td>
                                    <td>{value.cardnumber}</td>
                                    <td>{value.total}</td>
                                    <td>Success</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

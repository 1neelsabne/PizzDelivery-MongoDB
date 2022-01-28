import React from "react";
import { useNavigate } from "react-router";
import { Alert, Button, Card, Container } from "react-bootstrap";
import NavBar from "../components/NavBar";

export default function SuccessDash() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            <Container className="text-center">
                <br />
                <h1>Order Confirmation</h1>
                <br />
                <Card style={{ padding: "30px" }}>
                    <h1>Order has been placed successfully...</h1>
                    <br />
                    <Alert variant="success">
                        <Alert.Heading>
                            You will receive notification by email.
                        </Alert.Heading>
                    </Alert>
                    <br />
                    <Button onClick={() => navigate("/pizzadash")}>
                        Go and Order some more
                    </Button>
                </Card>
            </Container>
        </div>
    );
}

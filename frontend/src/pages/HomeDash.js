import NavBar from "../components/NavBar";
import { Card, Container } from "react-bootstrap";

let user = JSON.parse(localStorage.getItem("user"));

function HomeDash() {
    return (
        <>
            <NavBar />
            <Container className="text-center ">
                <br />
                <h1>User Details</h1>
                <br />
                <Card style={{ width: "30%", margin: "auto", padding: "20px" }}>
                    <Card.Img
                        variant="top"
                        src="../../images/boy.png"
                        width="100px"
                        height="250px"
                    />
                    <Card.Body>
                        <Card.Title>
                            {user.fname} {user.lname}
                        </Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default HomeDash;

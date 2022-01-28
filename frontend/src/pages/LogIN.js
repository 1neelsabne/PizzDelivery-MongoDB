import React from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSchema = Yup.object()
    .shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().min(8).max(16).required("Password is required"),
    })
    .required();

function LogIN() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {
        //console.warn(data);
        if (data) {
            axios.post("http://localhost:8888/login", data).then((res) => {
                //alert(res.data.message);
                console.log(res.data.token);
                if (res.data.userDet) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.userDet)
                    );
                    toast.success(`${res.data.message}`, {
                        position: "top-left",
                        autoClose: 5000,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        navigate("/pizzadash");
                    }, 3000);
                } else {
                    toast.error(`${res.data.message}`, {
                        position: "top-left",
                        autoClose: 5000,
                        theme: "dark",
                    });
                }
            });
        } else {
            toast.error("Data is not comming !", {
                position: "top-left",
                autoClose: 5000,
                theme: "dark",
            });
        }
    };

    return (
        <>
            <section className="bg-image">
                <Container
                    fluid
                    className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto"
                >
                    <Card className="card0 border-0">
                        <Row className="d-flex">
                            <Col className="col-lg-6">
                                <div className="card1 pb-5">
                                    <Row>
                                        <Image
                                            src=".././images/cc.png"
                                            className="logo"
                                        />
                                    </Row>
                                    <Row className="px-3 justify-content-center mt-4 mb-5 border-line">
                                        <Image
                                            src=".././images/cc.png"
                                            className="image"
                                        />
                                    </Row>
                                </div>
                            </Col>

                            <Col className="col-lg-6">
                                <Card className="card2 border-0 px-4 py-5">
                                    <Row className="mb-4 px-3">
                                        <h6 className="mb-0 mr-4 mt-2">
                                            Sign in with
                                        </h6>
                                        <div className="facebook text-center mr-3">
                                            <div className="fa fa-facebook"></div>
                                        </div>
                                        <div className="twitter text-center mr-3">
                                            <div className="fa fa-twitter"></div>
                                        </div>
                                        <div className="linkedin text-center mr-3">
                                            <div className="fa fa-linkedin"></div>
                                        </div>
                                    </Row>

                                    <Row className="px-3 mb-4">
                                        <div className="line"></div>
                                        <small className="or text-center">
                                            Or
                                        </small>
                                        <div className="line"></div>
                                    </Row>

                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="px-3">
                                            <Form.Label className="mb-1">
                                                <h6 className="mb-1 text-sm">
                                                    Email Id / Uname
                                                </h6>
                                            </Form.Label>
                                            <Form.Control
                                                className="mb-1"
                                                type="text"
                                                {...register("email")}
                                                placeholder="Enter a valid email id or user name"
                                                required
                                            />

                                            <Form.Text className="text-muted mb-3">
                                                We'll never share your email
                                                with anyone else.
                                            </Form.Text>
                                            <Col>
                                                <small className="form-text text-right text-danger font-italic mb-1">
                                                    {errors.email?.message}
                                                </small>
                                            </Col>
                                        </Row>
                                        <Row className="px-3">
                                            <Form.Label className="mb-1">
                                                <h6 className="mb-1 text-sm">
                                                    Password
                                                </h6>
                                            </Form.Label>
                                            <Form.Control
                                                className="mb-2"
                                                type="password"
                                                {...register("password")}
                                                placeholder="Enter password"
                                                required
                                            />
                                            <small className="form-text text-danger font-italic mb-1">
                                                {errors.password?.message}
                                            </small>
                                        </Row>
                                        <Row className="px-3 mb-4">
                                            <div className="custom-control custom-checkbox custom-control-inline">
                                                <input
                                                    id="chk1"
                                                    type="checkbox"
                                                    name="chk"
                                                    className="custom-control-input"
                                                    required
                                                />
                                                <label
                                                    for="chk1"
                                                    className="custom-control-label text-sm"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                            <a
                                                href="/#"
                                                className="ml-auto mb-0 text-sm"
                                            >
                                                Forgot Password?
                                            </a>
                                        </Row>
                                        <Row className="mb-3 px-3">
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="btn-blue"
                                            >
                                                Login
                                            </Button>{" "}
                                            &nbsp;&nbsp;
                                            <Button
                                                variant="danger"
                                                type="reset"
                                                className="btn-blue"
                                            >
                                                Reset
                                            </Button>
                                        </Row>
                                    </Form>

                                    <Row className="mb-4 px-3">
                                        <small className="font-weight-bold">
                                            Don't have an account?{" "}
                                            <Link
                                                to="/signup"
                                                className="text-warning"
                                            >
                                                Register
                                            </Link>
                                        </small>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        <div className="bg-blue py-4">
                            <Row className="px-3">
                                <small className="ml-4 ml-sm-5 mb-2">
                                    Copyright &copy; 2021. All rights reserved.
                                </small>
                                <div className="social-contact ml-4 ml-sm-auto">
                                    <span className="fa fa-facebook mr-4 text-sm"></span>
                                    <span className="fa fa-google-plus mr-4 text-sm"></span>
                                    <span className="fa fa-linkedin mr-4 text-sm"></span>
                                    <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
                                </div>
                            </Row>
                        </div>
                    </Card>
                </Container>
            </section>
            <ToastContainer newestOnTop />
        </>
    );
}

export default LogIN;

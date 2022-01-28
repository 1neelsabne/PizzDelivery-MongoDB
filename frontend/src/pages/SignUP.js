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

const SignSchema = Yup.object()
    .shape({
        fname: Yup.string().min(2).required("First Name is required"),
        lname: Yup.string().min(2).required("Last Name is required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().min(8).max(16).required("Password is required"),
        cpass: Yup.string()
            .oneOf([Yup.ref("password")], "Password does not match")
            .required(),
    })
    .required();

export function SignUP() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignSchema),
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        //console.warn(data);
        if (data) {
            axios.post("http://localhost:8888/signup", data).then((res) => {
                //alert(res.data.message);
                if (res.data.flg === 1) {
                    toast.success(`${res.data.message}`, {
                        position: "top-left",
                        autoClose: 5000,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        navigate("/");
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
            alert("Data is not comming..");
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
                                            src=".././images/pizza.jpg"
                                            className="image"
                                        />
                                    </Row>
                                </div>
                            </Col>
                            <Col className="col-lg-6">
                                <Card className="card2 border-0 px-3 py-5">
                                    <Row>
                                        <h5>Sign UP</h5>
                                    </Row>
                                    <hr />
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className=" mb-2">
                                            <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        First Name
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    className=""
                                                    id="exampleInputFname"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter your first name"
                                                    {...register("fname")}
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic mb-1"
                                                >
                                                    {errors.fname?.message}
                                                </small>
                                            </Col>
                                            <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        Last Name
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    id="exampleInputLname"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter your last name"
                                                    {...register("lname")}
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic"
                                                >
                                                    {errors.lname?.message}
                                                </small>
                                            </Col>
                                        </Row>

                                        <Row className="mb-2">
                                            <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        Email Address
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="email"
                                                    {...register("email")}
                                                    placeholder="Enter a valid email address"
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic"
                                                >
                                                    {errors.email?.message}
                                                </small>
                                            </Col>
                                            {/* <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        User Name
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="text"
                                                    id="exampleInputUsername"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Set User name"
                                                    name="uname"
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic"
                                                >
                                                    {" "}
                                                </small>
                                            </Col> */}
                                        </Row>

                                        <Row className="mb-1">
                                            <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        Password
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="password"
                                                    {...register("password")}
                                                    placeholder="Enter password"
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic"
                                                >
                                                    {errors.password?.message}
                                                </small>
                                            </Col>
                                            <Col>
                                                <Form.Label className="mb-1">
                                                    <h6 className="mb-1 text-sm">
                                                        Confirm Password
                                                    </h6>
                                                </Form.Label>

                                                <Form.Control
                                                    type="password"
                                                    id="exampleInputCPassword1"
                                                    placeholder="Confirm Password"
                                                    {...register("cpass")}
                                                    required
                                                />

                                                <small
                                                    id="emailHelp"
                                                    className="form-text text-danger font-italic"
                                                >
                                                    {errors.cpass?.message}
                                                </small>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col>
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
                                                        I accept the{" "}
                                                        <a href="/#">
                                                            Terms of Use
                                                        </a>{" "}
                                                        &amp;{" "}
                                                        <a href="/#">
                                                            Privacy Policy
                                                        </a>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="mb-2">
                                            <Col>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="btn-blue"
                                                >
                                                    Signup
                                                </Button>{" "}
                                                &nbsp;&nbsp;
                                                <Button
                                                    variant="danger"
                                                    type="reset"
                                                    className="btn-blue"
                                                >
                                                    Reset
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <Row className="mb-4">
                                        <Col>
                                            <small className="font-weight-bold">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/"
                                                    className="text-warning"
                                                >
                                                    Login
                                                </Link>
                                            </small>
                                        </Col>
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

export default SignUP;

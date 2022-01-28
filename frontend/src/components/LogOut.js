import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function LogOut() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate("/");
    }, [navigate]);

    // if (localStorage.clear()) {

    // }

    return <div></div>;
}

export default LogOut;

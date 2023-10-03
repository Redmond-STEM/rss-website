import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import token from "random-web-token"
import { useNavigate } from "react-router-dom"

const client_id = "437685874727-3qdnsdngbton283ql05pog6u1cfhp985.apps.googleusercontent.com"

const LoginPage = () => {

    let navigate = useNavigate()

    return (
        <div id="google-login">
            <GoogleLogin
                clientId={client_id}
                buttonText="Login"
                onSuccess={(res) => {
                    let authtoken = token.genSync("extra", 50)
                    let data = jwt_decode(res.credential)
                    let account = {
                        "email": data.email,
                        "name": data.given_name + " " + data.family_name,
                        "token": authtoken,
                        "type": "google"
                    }
                    axios.post("http://localhost:5000/api/loginaccount", account).then((res) => {
                        if (res.status === 201) { 
                            localStorage.setItem("authtoken", authtoken) 
                        } 
                        navigate("/") 
                    })
                }}
                onError={(res) => {
                    console.log("ERROR")
                }}
            />
        </div>
    );

}

export default LoginPage;
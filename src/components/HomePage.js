import React from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import token from "random-web-token"
import jwt_decode from "jwt-decode";
import axios from "axios";
import API_URL from "../Api";

const HomePage = () => {

    useGoogleOneTapLogin({ 
        onSuccess: res => {
          let authtoken = token.genSync("extra", 50)
          let data = jwt_decode(res.credential)
          let account = {
            "email": data.email,
            "name": data.given_name + " " + data.family_name,
            "type": "google",
            "token": authtoken
          }
          axios.post(API_URL + "loginaccount", account).then((res) => { if (res.status === 201) localStorage.setItem("authtoken", authtoken) })
        },
        disabled: localStorage.getItem("authtoken") != null
    })

    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the home page</p>
        </div>
    );

}

export default HomePage;
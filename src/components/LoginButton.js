import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import token from 'random-web-token';
import API_URL from '../Api';
import { NavDropdown } from "react-bootstrap";

const LoginButton = () => {

  const login = useGoogleLogin({
    onSuccess: res => {
      console.log("SUCCESS")
      axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${res.access_token}` },
      })
      .then((response) => {
        const data = response.data
        let authtoken = token.genSync("extra", 50)
        let account = {
          "email": data.email,
          "name": data.name,
          "type": "google",
          "token": authtoken
        }
        axios.post(API_URL + "loginaccount", account).then((response) => { if (response.status === 201) localStorage.setItem("authtoken", authtoken) })
      }) 
    }
  })

  return (
    <NavDropdown.Item onClick={() => login()}>Login</NavDropdown.Item>
  )

}


export default LoginButton;
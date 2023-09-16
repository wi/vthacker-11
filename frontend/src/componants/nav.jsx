import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const navStyle = {
    display: "flex",
    flexDirection: "column",

}

const linkStyle = {
    margin: "20px",
}


const profileStyle = {

}

const loginStyle = {
    marginRight: "auto",
    justifyContent: "flex-end",
}


export default function Nav(loggedIn=false) {
    const { loginWithRedirect } = useAuth0();


  return (
    <nav style={navStyle}>
        <div>
        {/* Your component content here */}
        <a href="./test" style={linkStyle}>test</a>
        <a href="./test" style={linkStyle}>test</a>
        <a href="./test" style={linkStyle}>test</a>

        <button style={loginStyle} onClick={(e) => loginWithRedirect()}>Login</button>
        </div>
    </nav>
  );
};

import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";


const navStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"

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

const localstorageAuthKey = "@@auth0spajs@@::JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk::@@user@@"


export default function Nav() {
    const { loginWithRedirect, logout } = useAuth0();

    // Only used for inital state
    const stats = localStorage.getItem(localstorageAuthKey);
    const loggedIn = stats ? true : false;

    const handleLogOut = () => {
        logout({logoutParams: {returnTo: "http://localhost:3000"}})
        //localStorage.clear() // clear all data as they wont need it
    }


  return (
    <nav style={navStyle}>
        <div>
        {/* Your component content here */}
        <a href="./test" style={linkStyle}>test</a>
        <a href="./test" style={linkStyle}>test</a>
        <a href="./test" style={linkStyle}>test</a>

        {loggedIn ? 
        <>
            <button style={loginStyle} onClick={(e) => handleLogOut()}>Log Out</button>
        </>
        :
        <button style={loginStyle} onClick={(e) => loginWithRedirect()}>Login</button>
        }
        </div>
    </nav>
  );
};

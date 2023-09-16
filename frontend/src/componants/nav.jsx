import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";


const navStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"

}


const localstorageAuthKey = "@@auth0spajs@@::JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk::@@user@@"


export default function Nav() {
    const { loginWithRedirect, logout } = useAuth0();

    // Only used for inital state
    const stats = localStorage.getItem(localstorageAuthKey);
    const loggedIn = stats ? true : false;

    const handleLogOut = () => {
        logout({logoutParams: {returnTo: "http://localhost:3000"}})
        localStorage.clear()
        //localStorage.clear() // clear all data as they wont need it
    }


  return (
    <nav style={navStyle}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <img src="/hlogo.png" alt="logo" style={{maxHeight: "100%", width: "50px", maxWidth: "75px", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}/>

        {loggedIn ? <Button style={{backgroundColor: "#fdfd96", display: "flex", flexDirection: "row", justifyContent: "flex-end"}} onClick={(e) => handleLogOut()}>Log Out</Button>
        :
        <Button style={{backgroundColor: "#ffda9e", display: "flex", flexDirection: "row", justifyContent: "flex-end"}} onClick={(e) => loginWithRedirect()}>Login</Button>
        }

        </div>
    </nav>
  );
};

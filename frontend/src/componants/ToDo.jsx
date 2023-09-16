import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const cacheKey = "linkCache";
const assignmentCache = "assignmentCache";
const filterKey = "filterKey"

export default function ToDo() {

    const [links, setLinks] = useState([])
    const [assignments, setAssignments] = useState([])
    const [filter, setFilter] = useState([])

    // inital state
    useEffect(() => {
        let cache = localStorage.getItem(cacheKey)
        if(cache) {
            const data = JSON.parse(cache)
            setLinks(data.urls)
        }

        setFilter(localStorage.getItem(filterKey)?.split(",") ?? [])

        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            setLinks((oldLinks) => {
                const urls = JSON.parse(localStorage.getItem(cacheKey)).urls || []
                if(oldLinks === urls) return oldLinks
                return urls
            })   
          });
          

    }, []);

    // When links are updated refetch assignments this also reorders them for us
    useEffect(() => {
        console.log("Links:", links);  // Add this
        console.log("Links updated....");
        const urls = links.join(",")
        console.log(urls)
        fetch("http://127.0.0.1:5000/getAssignments", {headers: {urls: urls}}).then(response => {
            response.json().then(json => setAssignments(json.events))
        })
    }, [links])
    

  return (
    <div style={{width: "33.33%", display: "flex", alignContent: "center", flexWrap: "wrap", padding: "0px 20px"}}>
      <div style={{backgroundColor: "#E2DFD2", height: "100vh", overflow: "scroll", width: "100%", padding: "5px"}}>
        {}

      </div>
      
    </div>
  );
};

import React, {useState, useEffect} from "react";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";


const cacheKey = "linkCache"
const filterKey = "filterKey"

export default function CalLinkInput() {

    const [links, setLinks] = useState([])
    const [filterZoom, setFilterZoom] = useState()
    const {user} = useAuth0()


    useEffect(() => {
        let cache = localStorage.getItem(cacheKey)
        if(cache) {
            const data = JSON.parse(cache)
            if(data.lastUpdated + 6000 *5 < Date.now() /* 5min */)
            setLinks(data.urls)
            return;
        }

        fetch("http://127.0.0.1:5000/getUserLinks")
        .then(response => response.json()
            .then(json => setLinks((old) => {
                if(old === json) return old;
                const time = Date.now()
                localStorage.setItem(cacheKey, JSON.stringify({lastUpdated: time, urls: json}))
                return Array.from(json)
            }))
            )
      }, []);

      function handleDelete(index) {
        if(index < 0 || index > links.length || !user?.email) return;
        const newLinks = links.filter((link, i)=> index !== i)

        fetch("http://127.0.0.1:5000/setUserLinks", {
          method: "POST",
          headers: {
            "email": user.email,
            "urls": newLinks.join(",")
          }
        }).catch(err => err)
        setLinks(newLinks)

      }
      function handleSave() {
        fetch("http://127.0.0.1:5000/setUserLinks", {
          method: "POST",
          headers: {
            "email": user.email,
            "urls": links.join(",")
          }
        }).catch(err => err)
      }

      function handleAddLink() {
        setLinks([...links, ""])
      }

      function handleInputChange(e, index) {
        const newLinks = [...links]
        newLinks[index] = e.target.value
        console.log(newLinks)
        setLinks(newLinks)
      }

      function handleFilterChange(e) {
        const fitlerValue = 
        localStorage.setItem(filterKey, e.target.value)
      }
      


  return (
    <div style={{width: "33.33%"}}>
        {links.map((url, index) => {
            return <div key={index} style={{display: "flex", alignItems: "center", flexWrap: "nowrap", width: "100%"}}>
                <input type="text" defaultValue={url} onInput={(e) => handleInputChange(e, index)} style={{width: "85%"}}></input>
                <Button backgroundColor="#ffb3ba" size="xs" onClick={e => handleDelete(index)}>Delete</Button>
            </div>
        })}
        <br/>
        <div style={{display: "inline-block", width: "100%"}}>
          <Button onClick={e => handleAddLink()} style={{alignSelf: "center", width: "50%"}} backgroundColor="#bae1ff">Add Link</Button>
          <Button onClick={e => handleSave()} style={{alignSelf: "center", width: "50%"}} backgroundColor="#bae1ff">Save</Button>
        </div>
        <div style={{marginTop: "10px"}}>
          <input type="text" defaultValue={localStorage.getItem(filterKey) ?? ""} placeholder="Filter events (Seperated By Commas)" style={{width: "100%"}} onInput={e => handleFilterChange(e)}></input>
          
        </div>

    </div>
  );
};

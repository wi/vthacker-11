import React, {useState, useEffect} from "react";
import { Button } from "@chakra-ui/react";


const cacheKey = "linkCache"
const filterKey = "filterKey"

export default function CalLinkInput() {

    const [links, setLinks] = useState([])

    const email = JSON.parse(localStorage.getItem("@@auth0spajs@@::JpeLGJQBmOoGRLfzrcNMQvVCGPZ4D3nk::@@user@@"))?.decodedToken?.user?.email


    useEffect(() => {
        let cache = localStorage.getItem(cacheKey)
        if(cache) {
            const data = JSON.parse(cache)
            if(data.lastUpdated + 6000 *5 < Date.now() /* 5min */)
            setLinks(data.urls)
            return;
        }

        fetch("http://127.0.0.1:5000/getUserLinks", {
          headers: {
          "email": email,
        }})
        .then(response => response.json()
            .then(json => setLinks((old) => {
                console.log(json)
                if(old === json) return old;
                const time = Date.now()
                localStorage.setItem(cacheKey, JSON.stringify({lastUpdated: time, urls: json}))
                return json
            }))
            )
      }, []);

      function handleDelete(index) {
        if(index < 0 || index > links.length || !email) return;
        const newLinks = links.filter((link, i)=> index !== i)

        fetch("http://127.0.0.1:5000/setUserLinks", {
          method: "POST",
          headers: {
            "email": email,
            "urls": newLinks.join(",")
          }
        }).catch(err => err)
        setLinks(newLinks)
        const time = Date.now()
        localStorage.setItem(cacheKey, JSON.stringify({lastUpdated: time, urls: newLinks}))
        window.dispatchEvent(new Event("links"))

      }
      function handleSave() {
        fetch("http://127.0.0.1:5000/setUserLinks", {
          method: "POST",
          headers: {
            "email": email,
            "urls": links.join(",")
          }
        }).catch(err => err)
        const time = Date.now()
        localStorage.setItem(cacheKey, JSON.stringify({lastUpdated: time, urls: links}))
        window.dispatchEvent(new Event("links"))
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
      


  return (
    <div style={{width: "33.33%"}}>
      <h1 style={{display: "flex",justifyContent: "center" ,fontSize: "30px"}}>Link Input</h1>
        {links.map((url, index) => {
            return <div key={index} style={{display: "flex", alignItems: "center", flexWrap: "nowrap", width: "100%"}}>
                <input type="text" defaultValue={url} onInput={(e) => handleInputChange(e, index)} style={{width: "85%", borderStyle: "solid", borderWidth: "3px", borderRadius: "3px"}} placeholder="Enter .ics URL"></input>
                <Button backgroundColor="#ffb3ba" size="xs" onClick={e => handleDelete(index)}>Delete</Button>
            </div>
        })}
        <br/>
        <div style={{display: "inline-block", width: "100%"}}>
          <Button onClick={e => handleAddLink()} style={{alignSelf: "center", width: "50%", borderTopRightRadius: "0px", borderEndEndRadius: "0px"}} backgroundColor="#bae1ff">Add Link</Button>
          <Button onClick={e => handleSave()} style={{alignSelf: "center", width: "50%", borderTopLeftRadius: "0px", borderEndStartRadius: "0px"}} backgroundColor="#bae1ff">Save</Button>
        </div>

    </div>
  );
};

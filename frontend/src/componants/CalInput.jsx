import React, {useState, useEffect} from "react";

const cacheKey = "linkCache"

export default function CalLinkInput() {

    const [links, setLinks] = useState([])


    useEffect(() => {
        let cache = localStorage.getItem(cacheKey)
        console.log(cache)
        if(cache) {
            const data = JSON.parse(cache)
            if(data.lastUpdated + 6000 *5 < Date.now() /* 5min */)
            setLinks(data.urls)
            return;
        }

        fetch("http://127.0.0.1:5000/getUserLinks")
        .then(response => response.json()
            .then(json => setLinks((old) => {
                if(old == json) return old;
                const time = Date.now()
                localStorage.setItem(cacheKey, JSON.stringify({lastUpdated: time, urls: json}))
                return Array.from(json)
            }))
            )
      }, []);

      


  return (
    <div style={{width: "33.33%"}}>
      {/* Your component content here */}
      <h1>
        {console.log(links)}
        {links.map((url, index) => {
            return <div key={index}>
                <p>{url}</p>
            </div>
        })}
      </h1>
    </div>
  );
};

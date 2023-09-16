import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const cacheKey = "linkCache";
const filterKey = "filterkey"
const prioirtyKey = "priorityKey"

export default function ToDo() {

    const [links, setLinks] = useState([])
    const [assignments, setAssignments] = useState([])
    const [filter, setFilter] = useState([])
    const [p, setPriority] = useState([])

    // inital state
    useEffect(() => {
        let cache = localStorage.getItem(cacheKey)
        if(cache) {
            const data = JSON.parse(cache)
            setLinks(data.urls)
        }

        setFilter(JSON.parse(localStorage.getItem(filterKey)) ?? [])
        setPriority(JSON.parse(localStorage.getItem(prioirtyKey)) ?? [])

        window.addEventListener("filter", () => {
            setFilter((oldFilter) => {
                const filters = JSON.parse(localStorage.getItem(filterKey)) || []
                return filters
            })
        })

        window.addEventListener("priority", () => {
            setPriority((oldP) => {
                console.log("NEW P")
                const p = JSON.parse(localStorage.getItem(prioirtyKey)) || []
                return p
            })
        })
        

        window.addEventListener('links', () => {
            setLinks((oldLinks) => {
                const urls = JSON.parse(localStorage.getItem(cacheKey)).urls || []
                return urls
            })
            
          });
          

    }, []);

    // When links are updated refetch assignments this also reorders them for us
    useEffect(() => {
        console.log("RERENDERING")
        const urls = links.join(",")
        console.log(urls)
        
        fetch("http://127.0.0.1:5000/getAssignments", {headers: {urls: urls}}).then(response => {
            response.json().then(json => {
                let monthDayEvents = {};
                
                json.events.forEach(event => {
                    const date = new Date(event.end * 1000);
                    const month = date.getMonth();
                    const day = date.getDate();
                    const key = `${month + 1}-${day}`;
                    
                    if (!monthDayEvents.hasOwnProperty(key)) {
                        monthDayEvents[key] = [];
                    }
            
                    // Calculate the priority of the event.
                    let priority = 0;
                    p.forEach(priorityWord => {
                        if (event.summary.includes(priorityWord)) {
                        priority++;
                        }
                    });
            
                    monthDayEvents[key].push({ ...event, priority });
                    });
              
                    const keys = Object.keys(monthDayEvents).sort();
              
                    // Sort the monthDayEvents object by priority.
                    const sortedMonthDayEvents = {};
                    keys.forEach(key => {
                      monthDayEvents[key].sort((event1, event2) => event2.priority - event1.priority);
                      sortedMonthDayEvents[key] = monthDayEvents[key];
                    });
              
                    monthDayEvents = sortedMonthDayEvents;
              
                    const reactState = [];
                    for (const [monthDay, assignments] of Object.entries(monthDayEvents)) {
                      reactState.push({ monthDay, assignments });
                    }
              
                    setAssignments(reactState);              
            })
        }).catch(err =>null)
    }, [links, filter, p]);

    

  return (
    <div style={{width: "33.33%", display: "flex", alignContent: "center", flexWrap: "wrap", padding: "0px 20px"}}>
      <div style={{backgroundColor: "#E2DFD2", height: "100vh", overflowY: "scroll", overflowX:"hidden", width: "100%", padding: "5px", maxWidth: "100%"}}>
        {
            assignments.map((dayContainer, index) => {
                const day = dayContainer.monthDay
                return <div key={index}>
                    <h2 style={{display: "flex", justifyContent: "center"}}>{day}</h2>
                    <div >
                        {dayContainer.assignments.map((assignment, pos) => {
                            console.log(assignment)
                            const date = new Date(assignment.end * 1000);
                            const info = assignment.summary
                            const breakPoint = pos !== 0 && pos%2===0;
                            console.log(breakPoint)

                            if (filter.some(filterWord => info.toLowerCase().includes(filterWord.toLowerCase()))) return <></>;

                            return <>
                            <p>{info}</p>
                            <p style={{fontSize: "11px"}}>Due At: {date.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</p>
                            <br/>
                            </>
                        })}
                    </div>
                </div> 
            })
        }

      </div>
      
    </div>
  );
};

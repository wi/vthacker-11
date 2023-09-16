
import React from "react";
import { useState } from "react";
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

const filterKey = "filterkey"
const prioirtyKey = "priorityKey"

export default function Settings() {


    const [filters, setFilters] = useState(JSON.parse(localStorage.getItem(filterKey)) ?? []);
    const [showFilterInput, setFilterInput] = useState(false)

    const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem(prioirtyKey)) ?? []);
    const [showPriorityrInput, setPriorityInput] = useState(false)


    function addFilter(e) {
        setFilters([...filters, e.target.value])
        localStorage.setItem(filterKey, JSON.stringify(filters))
        e.target.value = ""
        window.dispatchEvent(new Event("filter"));

    }

    function addPriority(e) {
        setPriorities([...priorities, e.target.value])
        localStorage.setItem(prioirtyKey, JSON.stringify(priorities))
        e.target.value = ""
        window.dispatchEvent(new Event("priority"));

      }


    function handleFilterRemove(index) {
        // This is ironic
        if(filters.length === 1) {
            localStorage.setItem(filterKey, JSON.stringify([]))
            setFilters([])
            window.dispatchEvent(new Event("filter"));
            return
        }
        const newFilter = filters.filter((word, i) => index !== i)
        setFilters(newFilter)
        localStorage.setItem(filterKey, JSON.stringify(filters))
        window.dispatchEvent(new Event("filter"));


    }

    function handlePriorityRemove(index) {
        if(priorities.length === 1) {
            localStorage.setItem(prioirtyKey, JSON.stringify([]))
            setPriorities([])
            window.dispatchEvent(new Event("priority"));
            return
        }
        const newPriority = priorities.filter((word, i) => index !== i)
        setPriorities(newPriority)
        window.dispatchEvent(new Event("priority"));

    }

    return (
        <div style={{width: "33.33%"}}>
            <h1 style={{display: "flex",justifyContent: "center" ,fontSize: "30px"}}>Settings</h1>
            <h3>Filtered Words</h3>
            <div style={{marginTop: "10px", display: "inline-block", borderStyle: "solid", borderWidth: "3px", width: "100%"}}>
                {filters.map((filtered, index) => {
                    return <p style={{backgroundColor:"#c5c6c8", fontSize:"11px", maxWidth: "fit-content", display: "inline-block", margin: "3px"}}>{filtered} <CloseIcon  onClick={e => handleFilterRemove(index)} style={{cursor: "pointer"}}/></p>
                })}
                <input onMouseLeave={e =>setFilterInput(false)} onKeyPress={(e) => e.key === 'Enter' && addFilter(e)} style={{display: showFilterInput ? "" : "none", borderStyle: "solid", borderWidth: "1px"}} type="text" autoFocus placeholder="Enter phrase"></input>
                <AddIcon style={{cursor: "pointer", backgroundColor: "#E5EBB2", display: showFilterInput ? "none" : ""}} onClick={e => setFilterInput(true)}/>
            </div>
            <h3>Priority Words</h3>
            <div style={{marginTop: "10px", display: "inline-block", borderStyle: "solid", borderWidth: "3px", width: "100%"}}>
                {priorities.map((words, index) => {
                    return <p style={{backgroundColor:"#c5c6c8", fontSize:"11px", maxWidth: "fit-content", display: "inline-block", margin: "3px"}}>{words} <CloseIcon  onClick={e => handlePriorityRemove(index)} style={{cursor: "pointer"}}/></p>
                })}
                <input onMouseLeave={e =>setPriorityInput(false)} onKeyPress={(e) => e.key === 'Enter' && addPriority(e)} style={{display: showPriorityrInput ? "" : "none", borderStyle: "solid", borderWidth: "1px"}} type="text" autoFocus placeholder="Enter phrase"></input>
                <AddIcon style={{cursor: "pointer", backgroundColor: "#E5EBB2", display: showPriorityrInput ? "none" : ""}} onClick={e => setPriorityInput(true)}/>
            </div>
        </div>
    );
};





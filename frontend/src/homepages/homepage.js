//importing react hooks
import React, {useEffect, useState} from 'react'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import './homepage.css'

//functinonal compeonent
function HomePage() {

    //Figure out how to grab data. 
    //Need to redo data according to Brian's explaination. 
    //Brian: Instead of sending data all compiled into one json. We should consider
    //splitting the return that way the frontend can digest the data returned.

    //Store fetched data
    const [player, setData] = useState(null);

    //Dark/Light mode
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    useEffect(() =>{
        fetch('flaskreturnurl')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    });

    return(
        <div>
            
        </div>
    )
}

// making the functional component HomePage avaialbe in other applications.
export default HomePage;
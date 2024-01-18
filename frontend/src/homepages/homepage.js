//importing react hooks
import React, {useEffect, useState} from 'react'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import './homepage.css'

//functinonal compeonent
function HomePage() {
    //useSate hook 
    const [data, setData] = useState(null);

    useEffect(() =>{
        fetch('flaskreturnurl')
        .then(response => response.json)
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    });

    return(
        <div>
            <h1>Homepage</h1>

        </div>
    )
}

// making the functional component HomePage avaialbe in other applications.
export default HomePage;
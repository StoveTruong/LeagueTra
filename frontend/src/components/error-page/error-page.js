import React from 'react';
import './error-page.css'

export default function ErrorPageComponent(status) {
    return (
        <div className='errorPageContainer'>
            <div className='noResultsContainer'>
                <h3>ERROR</h3>
            </div>
        </div>
    )
}
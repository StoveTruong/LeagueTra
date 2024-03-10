import React from 'react';
import { useLocation } from 'react-router';

import './error-page.css'

export default function ErrorPageComponent(status) {
  const location = useLocation();

  return (
    <div className='errorPageContainer'>
      <div className='noResultsMessageContainer'>
        <h1>{location.state.status_code} - {location.state.message}</h1>
        {[401, 403, 500].includes(location.state.status_code) &&
          <p className='riotApiErrorMessage'>
            Looks like we're having trouble connecting to Riot's API. <br/>
            Please check again later.
          </p>
        }
      </div>
    </div>
  )
}
import React, {useEffect, useState} from 'react';
import {searchResult} from './compontents/search-page/search-page';



function matchDetails(){

    return(
        <div>
            { JSON.stringify(searchResult) }
        </div>
    )
}
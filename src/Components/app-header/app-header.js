import React from 'react'

import './app-header.css'

const AppHeader = ({postCounter}) =>{
    return(
        <div className="app-header d-flex">
            <h1>დავალება მანქანებზე</h1>
            <h2>სიაში ჩანაწერების რაოდენობა : {postCounter}</h2>
        </div>
    )
}

export default AppHeader;
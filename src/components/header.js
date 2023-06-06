import React, {useState} from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import {useIsAuthenticated, useAuthUser} from "react-auth-kit";

function Header(){
const x=useIsAuthenticated();
const y=useAuthUser()
if(x()===true){
    return(
        <div className="header">
        <h1 className="titlee"><HighlightIcon></HighlightIcon> KeepItAll</h1>
        <div className="routes">
            <a href="/">{y().username}</a>
            <a href="/ListV1">List</a>
            <a href="/ListV2">Reminders</a>
        </div>
        </div>
        )
    
}
else{
return(
    <div className="header">
    <h1 className="titlee"><HighlightIcon></HighlightIcon> Keeper</h1>
    <div className="routes">
    </div>
    </div>
)
}
}

export default Header;
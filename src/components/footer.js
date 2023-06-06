import React from "react";
import * as list from "../functions/RelojPro";
function footer(){
    return(
        <div className="footer">
        <p>{`CoppyRight ${list.year()}`}</p>
       </div>
    )
}

export default footer;
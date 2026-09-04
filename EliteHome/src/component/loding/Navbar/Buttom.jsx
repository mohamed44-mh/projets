import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Buttom=({name, onClick})=>{
    return(
    <button className="btn btn-primary shadow" onClick={onClick}>
        {name}
    </button>
    );
}
export default Buttom
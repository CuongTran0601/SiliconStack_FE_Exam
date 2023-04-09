import React from "react";
import { Outlet } from "react-router-dom";


function MainPage() {

    
  return (
    <div >
        <Outlet></Outlet>
    </div>
  );
}

export default MainPage;

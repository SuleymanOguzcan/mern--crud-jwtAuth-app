import React from "react";
import Addtodos from "./Addtodos";





function Home() {
  return (
    <>
      <h6 className="text-center">welcome {localStorage.getItem("name")}</h6>
      <Addtodos />
      
      
      
    </>
  );
}

export default Home;

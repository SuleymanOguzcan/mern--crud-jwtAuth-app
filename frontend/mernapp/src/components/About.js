import React from 'react'

function About() {
  return (
    <h1 className="text-center" >Merhaba {localStorage.getItem("name")}</h1>
    )
}

export default About
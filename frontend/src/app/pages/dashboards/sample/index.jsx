import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Sample = () => {
   const [name,setName]=useState("");
    const [email,setEmail]=useState("");
  return (
     <div>
            <h1>Welcome to the Sample Page!</h1>
            <p>This is the content shown when you click the Sample menu item in the sidebar.</p>
            <p>Current Login User : {name}</p>
            <p>Current Login Email : {email}</p>
        </div>
  )
}

export default Sample;
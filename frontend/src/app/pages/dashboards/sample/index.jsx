import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Sample = () => {
   const [name,setName]=useState("");
    const [email,setEmail]=useState("");
   useEffect(() => {
    //    const getData = async () => {
    //        const response = await axios.get("http://localhost:3000/api/users",{ withCredentials: true });
    //        console.log("this is user response",response.data[1].name);
    //        setName(response.data.name);
    //        setEmail(response.data.email);
    //    }
    //    getData();
   })
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
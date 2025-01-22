import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";
import axios from "axios";

function Profile() {
    const [privateContent, setPrivateContent] = useState({});
    const {user} = useContext(AuthContext);


    useEffect(() => {
        console.log("prive data")
        const token = localStorage.getItem('token');

           async function fetchPrivateContent(){
              try {

               const result = await axios.get(`http://localhost:3000/660/private-content/`, {
                   headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${token}`,
                   }})
                  console.log(result.data);
               setPrivateContent(result.data);

           }catch (e){
                  console.error(e + " Er ging wat fout met prive content ophalen")

              }
           }

        fetchPrivateContent()

    }, []);

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam: </strong>{user.username}</p>
        <p><strong>Email: </strong>{user.email}</p>
      </section>
      <section>
        <h2>{privateContent.title}</h2>
        <p>{privateContent.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;
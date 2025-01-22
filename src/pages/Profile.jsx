import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";
import axios from "axios";

function Profile() {
    const [privateContent, setPrivateContent] = useState({});
    const {user} = useContext(AuthContext);
    console.log(user + "joe joe")

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
                  setPrivateContent(result + "wat is dit");
               console.log(privateContent);
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
        <p><strong>Gebruikersnaam:</strong>user</p>
        <p><strong>Email:</strong>email</p>
      </section>
      <section>
        <h2></h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {
    const {handleSubmit, formState: {errors}, register} = useForm();
    const navigate = useNavigate();


    async function handleFormSubmit(data) {
        try {
            const response = await axios.post(
                "http://localhost:3000/register",
                {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Succesvol geregistreerd");
            navigate("/signin")
        } catch (e) {
            if (e.response) {
                console.error("Response fout:", e.response.status, e.response.data);
            } else if (e.request) {
                console.error("Geen response ontvangen:", e.request);
            } else {
                console.error("Fout tijdens setup request:", e.message);
            }
        }
    }


    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="email">
                    Email
                    <input id="email" {...register("email", {
                        required: {
                            value: true,
                            message: 'Email veld is verplicht',
                        },
                        validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                    })} type="email"/>
                    {errors.email && <p>{errors.email.message}</p>}
                </label>

                <label htmlFor="password">
                    Wachtwoord
                    <input id="password" {...register("password", {
                        required: {
                            value: true,
                            message: 'Een wachtwoord is verplicht',
                        }
                    })} type="password"/>
                    {errors.password && <p>{errors.password.message}</p>}
                </label>

                <label htmlFor="username">
                    Gebruikersnaam
                    <input id="username" {...register("username", {
                        required: {
                            value: true,
                            message: 'Gebruikersnaam is verplicht',
                        }
                    })} type="text"/>
                    {errors.username && <p>{errors.username.message}</p>}
                </label>

                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
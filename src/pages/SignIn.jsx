import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm();


    async function handleFormSubmit(data) {
        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Succesvol ingelogd:", response.data.accessToken);
            login(response.data.accessToken);
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
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

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

                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
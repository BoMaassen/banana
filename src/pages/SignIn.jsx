import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register} = useForm();

    function handleFormSubmit(data) {
        console.log(data);
        login();
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
                </label>
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="password">
                    Wachtwoord
                    <input id="password" {...register("password", {
                        required: {
                            value: true,
                            message: 'Een wachtwoord is verplicht',
                        }
                    })} type="password"/>
                </label>
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="username">
                    Gebruikersnaam
                    <input id="username" {...register("username", {
                        required: {
                            value: true,
                            message: 'Gebruikersnaam is verplicht',
                        }
                    })} type="text"/>
                </label>
                {errors.name && <p>{errors.name.message}</p>}
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
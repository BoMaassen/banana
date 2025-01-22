function isTokenValid(decoded){
    const expiration = decoded.exp;
    const now = new Date().getTime() / 1000;

    return now < expiration;
}

export default isTokenValid;
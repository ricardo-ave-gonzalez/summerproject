import { API_HOST, TOKEN } from '../utils/constant'
import jwtDecode from 'jwt-decode';

export function signUpApi(user) {
    //luego agregaremos nginx por ahora testeamos sin proxy
    const url = `${API_HOST}/signup/`
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(), //siempre enviamos el mail en minuscula
        fechaNacimiento: new Date()
    }
    delete userTemp.repeatPassword

    const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userTemp)
    }

    /* fetch(`/api/v1/contratista`, () => {

    }) */
    return fetch(url, params)
        .then(z => {
            if (z.status >= 200 && z.status < 300) {
                return z.json()
            }
            return { code: 404, messagge: "no disponible..." }
        })
        .then(z => { return z })
        .catch(err => { return err })
}

export function signInApi(user) {
    const url = `${API_HOST}/login`

    const data = {
        ...user,
        email: user.email.toLowerCase()
    }

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(z => {
        if (z.status >= 200 && z.status < 300) {
            return z.json()
        }
        return { messagge: "Usuario o contraseña incorrectos" }
    })
        .then(z => z)
        .catch(z => z)
}

export function setTokenApi(token) {
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
    return localStorage.getItem(TOKEN);
}

export function logoutApi() {
    localStorage.removeItem(TOKEN);
}

export function isUserLogedApi() {
    const token = getTokenApi();
    if (!token) {
        logoutApi();
        return null;
    }
    if (isExpired(token)) {
        logoutApi();
    } 
    return jwtDecode(token);
    //console.log(token)
}

function isExpired(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now();

    if (timeout < 0) {
        return true;
    }
    return false;
}
import { API_HOST, TOKEN } from '../utils/constant'
import { getTokenApi } from './auth'

export async function obtenerUserApi(idUsuario){
    const url = `${API_HOST}/${idUsuario}`;

    const params = {
        headers: {
            "Content-Type":"applicattion/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return await fetch(url, params).then(z => {
        // eslint-disable-next-line no-throw-literal
        if(z.status >= 400) throw null;
        return z.json();
    })
    .then(z => { return z})
    .catch(err => console.log(err))
}
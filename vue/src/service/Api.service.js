import axios from 'axios'

export default () => {
    try{
        return axios.create({
            url: 'http://localhost:3000/sb/',
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }catch (e) {
        console.log('Error al crear Api: ' + e);
    }

}
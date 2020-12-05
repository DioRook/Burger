import axios from 'axios'

const instance = axios.create({
    baseURL:'https://burger-46888.firebaseio.com'
})

export default instance
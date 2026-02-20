import axios from "axios"

 const authAxios = axios.create({
    baseURL:"http://localhost:5000/"
})

export {authAxios}
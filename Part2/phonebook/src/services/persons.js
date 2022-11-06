import axios from 'axios'

const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseurl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseurl}/${id}`)
}

export default {getAll, create, deletePerson}
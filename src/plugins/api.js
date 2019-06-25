import axios from 'axios'

class API {
  constructor () {
    this.baseUrl = 'https://swapi.co/api'
  }

  fetchShips (url = `${this.baseUrl}/starships`) {
    return axios.get(url)
  }

  getStarship (id) {
    return axios.get(`${this.baseUrl}/starships/${id}`)
  }
}

const api = new API()

export default {
  install: (Vue) => {
    Vue.prototype.$api = api
  }
}

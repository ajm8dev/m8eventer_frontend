/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from '../../constants'

export default {
  getCustomerList: () => {
    return axios.get(API_ENDPOINTS.GET_CUSTOMERS_LIST, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}

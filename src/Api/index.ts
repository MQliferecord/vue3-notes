import store from '@/store';
import * as Types from '../store/action-types'
import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.data = qs.stringify(config.data)
    return config
});

axios.interceptors.response.use((response:AxiosResponse)=>{
    if(response.data.status==400){
        store.commit(Types.SET_ERROR,true)
    }
    return response.data;
},err=>{
    return Promise.reject(err)
})
export default axios;
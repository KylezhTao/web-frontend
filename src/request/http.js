import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';
import { Store } from 'vuex';

axios.defaults.baseURL="http://localhost:8080";

//创建axios
//设置请求超时时间
//axios.defaults.timeout(30*1000);

//设置请求头
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';

//跨域
axios.defaults.withCredentials = true;

//请求拦截器
axios.interceptors.request.use(
  config => {
    //此处判断Token
    return config;
},
err => {
    return err;
});

//封装不同的状态码
const errorHandle=status=>{
  switch(status){
    case 400:
      console.log('请求出错');
      break;
    case 401:
      console.log('请先进行登录');
      window.loginReset();
      break;
    case 403:
      //登录过期
      break;
    case 404:
      tip('请求的资源不存在');
      break;
  }
};

//响应拦截器
axios.interceptors.response.use(
  response => {
  	if(response.status===200){
      return Promise.resolve(response);
    }else{
      return Promise.reject(response);
    }
  },
  error => {
    errorHandle(error.response.status);
    console.log(error.response.data.message);
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
      axios
          .get(url, {
              params: params
          })
          .then(response => {
              resolve(response);
          })
          .catch(err => {
              reject(err);
          });
  });
}

/**
* 封装post请求
* @param url
* @param data
* @returns {Promise}
*/

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
      axios.post(url, data)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

/**
* 封装delete请求
* @param url
* @param data
* @returns {Promise}
*/

export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
      axios.delete(url, data).then(
          response => {
              resolve(response);
          },
          err => {
              reject(err);
          }
      );
  });
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
      axios.put(url, data).then(
          response => {
              resolve(response);
          },
          err => {
              reject(err);
          }
      );
  });
}



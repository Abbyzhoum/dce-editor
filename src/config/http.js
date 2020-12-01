import APIConfig from './api';
import axios from 'axios';

var api = {};

function axiosRequest(query = {}, payload = ''){
    var ssid = sessionStorage.getItem('dce-ssid') || '';

    var headers = {
        'content-type': this.contentType || 'application/json',
        ssid: sessionStorage.getItem('dce-ssid')
    }

    !ssid && delete headers.ssid

    return axios({
        timeout: 1000,
        method: this.method,
        url: render(this.url, query),
        // url: this.url,
        data: payload,
        headers,
        params: query
    })
}

function render (tpl, data) {
    var re = /{{([^}]+)?}}/
    var match = ''
  
    while ((match = re.exec(tpl))) {
      tpl = tpl.replace(match[0], data[match[1]] === undefined ? '' : data[match[1]])
    }
  
    return tpl
}

APIConfig.apis.forEach((item) => {
    api[item.name] = {
      url: `${APIConfig.baseUrl}${item.path}`,
      method: item.method,
      contentType: item.contentType || '',
      fire: axiosRequest
    }
  })

export default api;



import fetchApi from './fetch';

export default (data = {}, url = '') => fetchApi(data, url, 'POST', null);

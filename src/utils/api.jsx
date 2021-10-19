
const defaults = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: () => ({
    'Content-Type': 'application/json',
  }),
};

const api = (method, url, variables) => {
 return fetch(`${defaults.baseURL}${url}`,{
     method,
    headers: defaults.headers(),
    mode: 'cors',
    cache: 'default' ,
    params: method === 'get' ? variables : undefined,
    data: method !== 'get' ? variables : undefined,
 })
 .then((res) => res.json())
 .then(
    (result) => result,
    (error) =>  error
  );
 }

export default {get: (...args) => api('get', ...args)};

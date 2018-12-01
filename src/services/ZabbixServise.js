import axios from 'axios';

const CLIENT_USER = {
  username: process.env.REACT_APP_ZABBIX_USER_NAME,
  password: process.env.REACT_APP_ZABBIX_USER_PASSWORD
}

class ZabbixService {
  constructor(ipAddress) {
    this.auth = null
    this.baseUrl = `http://${ipAddress}/zabbix/api_jsonrpc.php`;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json-rpc' }
    });
    this.id = 1;

    this.request('user.login', {
      'user': CLIENT_USER.username,
      'password': CLIENT_USER.password
    })
      .then(data => {
        this.auth = data;
      })
      .catch(err => {
        console.error(err)
        // error表示
      });
  }

  request = async (method, params) => {
    const body = {
      jsonrpc: '2.0',
      method,
      params,
      auth: this.auth,
      id: this.id
    };
    const res = await this.client.post('/', body);
    console.log(res);
    this.id++;
    return res.data.result;
  };
}

export default ZabbixService;

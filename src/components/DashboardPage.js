import React from 'react';
import NotificationSystem from 'react-notification-system';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dashboard from './Dashboard';
import AwsService from '../services/AwsService';
import notificationType from '../services/notificationType';
import ZabbixService from '../services/ZabbixServise';
import './DashboardPage.css'

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      serverStatus: null,
      serverStatusName: '',
      ipAddress: '',
      onlineUserNum: null,
      isPageLoading: true,
      isZabbixServer: false
    }
    this.notificationSystem = React.createRef();
    this.zabbixClient = null;
  }

  componentDidMount() {
    this.setServerStatus();
  }

  /**
   * サーバーの状態を取得して画面を更新する
   */
  setServerStatus = async () => {
    const res = await AwsService.getServerStatus();
    const { body } = JSON.parse(res.Payload);
    console.log(body);
    const { Code, Name, PublicIpAddress } = body;
    if (PublicIpAddress && PublicIpAddress !== this.state.ipAddress) {
      this.zabbixClient = new ZabbixService(PublicIpAddress);
      this.setState({ isZabbixServer: true });
    } else if (this.state.isZabbixServer && !PublicIpAddress) {
      this.setState({ isZabbixServer: false });
    }
    this.setState({
      serverStatus: Code,
      serverStatusName: Name,
      ipAddress: PublicIpAddress || '',
      isPageLoading: false
    });
    if (this.state.isZabbixServer) setTimeout(() => this.fetchOnlineUserNum(), 1000);
  };

  postServerOperate = async action => {
    this.roadingPage();
    const preType = action === 'start' ? 'starting' : 'stopping';
    this.addNotification(preType);
    const res = await AwsService.operateServer(action);
    console.log(res);
    const type = action === 'start' ? 'started' : 'stopped';
    this.addNotification(type);
    this.setServerStatus();
  };

  fetchOnlineUserNum = () => {
    const method = 'item.get';
    const params = {
      host: 'MinecraftServer',
      search: { name: 'User' }
    };
    this.zabbixClient.request(method, params)
      .then(data => {
        if (data) {
          this.setState({ onlineUserNum: data[0].lastvalue });
        }
      });
  };

  roadingPage = () => {
    this.setState({ isPageLoading: true });
  };

  addNotification = type => {
    const { title, message, level } = notificationType(type);
    const notification = this.notificationSystem.current;
    notification.addNotification({
      position: 'tr',
      title,
      message,
      level
    })
  };

  render() {
    const props = Object.assign(
      {},
      { ...this.state },
      { setServerStatus: this.setServerStatus },
      { postServerOperate: this.postServerOperate },
      { roadingPage: this.roadingPage },
      { addNotification: this.addNotification }
    );
    return (
      <div className="dashboard__page">
        {this.state.isPageLoading
          ? <CircularProgress />
          : <Dashboard {...props} />
        }
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}

export default DashboardPage;

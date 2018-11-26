import React from 'react';
import NotificationSystem from 'react-notification-system';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dashboard from './Dashboard';
import AwsService from '../services/AwsService';
import notificationType from '../services/notificationType';
import './DashboardPage.css'

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      serverStatus: null,
      serverStatusName: '',
      ipAddress: '',
      isPageLoading: true
    }
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    this.setServerStatus()
  }

  /**
   * サーバーの状態を取得して画面を更新する
   */
  setServerStatus = async () => {
    const res = await AwsService.getServerStatus();
    console.log(res);
    const { body } = JSON.parse(res.Payload);
    this.setState({
      serverStatus: body.Code,
      serverStatusName: body.Name,
      ipAddress: body.PublicIpAddress || '',
      isPageLoading: false
    });
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

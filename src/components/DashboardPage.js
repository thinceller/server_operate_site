import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dashboard from './Dashboard';
import AwsService from '../services/AwsService';
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
  }

  postServerOperate = action => {
    console.log(action);
  }

  roadingPage = () => {
    this.setState({ isPageLoading: true })
  }

  render() {
    const props = Object.assign(
      {},
      { ...this.state },
      { setServerStatus: this.setServerStatus },
      { postServerOperate: this.postServerOperate },
      { roadingPage: this.roadingPage }
    );
    return (
      <div className="dashboard__page">
        {this.state.isPageLoading
          ? <CircularProgress />
          : <Dashboard {...props} />
        }
      </div>
    );
  }
}

export default DashboardPage;

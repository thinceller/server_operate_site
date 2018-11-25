import React from 'react';
import { Refresh } from '@material-ui/icons';
import {
  IconButton,
  Typography
} from '@material-ui/core';

import OperateForm from './OperateForm';

const Dashboard = props => {
  const onReloadButtonClick = () => {
    props.roadingPage()
    props.setServerStatus();
  }

  return (
    <div>
      <IconButton aria-label="reload" onClick={onReloadButtonClick} size="large">
        <Refresh color="primary" />
      </IconButton>
      <Typography variant="h2" align="left" gutterBottom color="primary">
        Server is <span className="headline__status">{props.serverStatusName}</span>.
      </Typography>
      {props.ipAddress
        ? <Typography variant="h4" align="left" color="secondary">
            IPアドレス: {props.ipAddress}
          </Typography>
        : ''
      }
      <OperateForm {...props} />
    </div>
  );
}

export default Dashboard;

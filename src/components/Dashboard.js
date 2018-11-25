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
      <Typography variant="h4" align="left">
        Server is {props.serverStatusName}.
      </Typography>
      {props.ipAddress
        ? <Typography variant="h4" align="left">
            IP アドレス: {props.ipAddress}
          </Typography>
        : ''
      }
      <OperateForm {...props} />
    </div>
  );
}

export default Dashboard;

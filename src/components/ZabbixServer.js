import React from 'react';
import {
  Typography
} from '@material-ui/core';

const ZabbixServer = ({ onlineUserNum }) => {
  return (
    <Typography variant="h6">
      オンラインユーザー数: <strong>{onlineUserNum}</strong>
    </Typography>
  );
}

export default ZabbixServer;

import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Refresh } from '@material-ui/icons';
import {
  Button,
  IconButton,
  Typography
} from '@material-ui/core';

import OperateForm from './OperateForm';
import ZabbixServer from './ZabbixServer';

const Dashboard = props => {
  const onReloadButtonClick = () => {
    props.roadingPage()
    props.setServerStatus();
  }

  const onCopy = () => {
    props.addNotification('clipboard');
  }

  return (
    <div>
      <span className="MuiTypography-root-41 MuiTypography-h2-54 MuiTypography-colorPrimary-71 MuiTypography-gutterBottom-68 MuiTypography-alignLeft-63">
        Server is {props.serverStatusName}.
      </span>
      {props.ipAddress
        ? <div className="ip__address">
            <Typography
              variant="h4"
              align="left"
              color="secondary"
              className="ip__address__text"
            >
              IPアドレス: {props.ipAddress}
            </Typography>
            <CopyToClipboard
              text={props.ipAddress}
              onCopy={onCopy}
              className="ip__address__copy"
            >
              <Button variant="outlined" color="primary">
                Copy
              </Button>
            </CopyToClipboard>
          </div>
        : ''
      }
      {props.isZabbixServer
        ? <ZabbixServer {...props} />
        : ''
      }
      <OperateForm {...props} />
      <span>
        更新
        <IconButton aria-label="reload" onClick={onReloadButtonClick} size="large">
          <Refresh color="primary" />
        </IconButton>
      </span>
    </div>
  );
}

export default Dashboard;

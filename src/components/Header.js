import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const Header = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            nagi Minecraft Server ダッシュボード
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

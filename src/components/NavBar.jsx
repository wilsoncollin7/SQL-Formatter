import * as React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box, makeStyles } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#1b5e20',
    padding: 3
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton edge='start' color='inherit'>
            <CodeIcon />
          </IconButton>
          <Typography variant='h6'>
            ICC Formatter
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position='static' className={classes.appBar}>
        <Box textAlign='center'>
          <Typography variant='caption'>
            No More Bologna!
          </Typography>
        </Box>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;

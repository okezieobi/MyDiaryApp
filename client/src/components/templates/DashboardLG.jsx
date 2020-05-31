/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, AppBar, CssBaseline, Typography,
  Toolbar, List, ListItem, Fab, Zoom, Button,
  ListItemIcon, ListItemText, useScrollTrigger,
} from '@material-ui/core';
import {
  AccountCircle, Home, KeyboardArrowUp,
} from '@material-ui/icons';
import Modal from './Modal';
import CardComponent from './Card';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  headerSpace: {
    flexGrow: 1,
    textAlign: 'center',
  },
  scrollStyles: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  card: {
    width: '35vw',
  },
}));


function ScrollTop({ children, window }) {
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollStyles}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

ScrollTop.defaultProps = {
  window: undefined,
};

function Dashboard({ content }, { children, window }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Modal childComponent={<CardComponent classAttr={classes.card} />} text="Create Report" color="inherit" />
          <Typography className={classes.headerSpace}>
            Your Right
          </Typography>
          <Button color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[{ text: 'Home', icon: <Home /> }, { text: 'Profile', icon: <AccountCircle /> }]
              .map(({ text, icon }) => (
                <ListItem button key={text}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar id="back-to-top-anchor" />
        { content }
        <ScrollTop children={children} window={window}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  content: PropTypes.shape.isRequired,
};

export default Dashboard;

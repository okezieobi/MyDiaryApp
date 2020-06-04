import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden, withWidth, List, ListItem,
} from '@material-ui/core';
import MobileView from '../templates/DashboardSM.jsx';
import DesktopView from '../templates/DashboardLG.jsx';
import Card from '../templates/Card.jsx';
import dashboardImg from '../../svg/undraw_onboarding_o8mv.svg';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${dashboardImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fit',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    height: '100%',
  },
  SMCard: {
    width: '90vw',
    opacity: 0.9,
  },
  LGCard: {
    width: '75vw',
    opacity: 0.9,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Hidden only={['lg', 'xl']}>
          <MobileView content={[...new Array(7)]
            .map((index) => (
              <List>
                <ListItem key={index}>
                  <Card classAttr={classes.SMCard} button />
                </ListItem>
              </List>
            ))}
          />
        </Hidden>
        <Hidden only={['sm', 'xs', 'md']}>
          <DesktopView
            content={[...new Array(7)]
              .map((index) => (
                <List>
                  <ListItem key={index}>
                    <Card classAttr={classes.LGCard} button />
                  </ListItem>
                </List>
              ))}
          />
        </Hidden>
      </div>
    </div>
  );
}

export default withWidth()(Dashboard);

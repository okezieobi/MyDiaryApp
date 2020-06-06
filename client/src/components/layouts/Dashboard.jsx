import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden, withWidth, List, ListItem, Fab,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Modal from '../templates/Modal';
import MobileView from '../templates/DashboardSM';
import DesktopView from '../templates/DashboardLG';
import Card from '../templates/Card';
import dashboardImg from '../../svg/undraw_onboarding_o8mv.svg';

const useStyles = makeStyles((theme) => ({
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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  card: {
    width: '75vw',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Hidden only={['lg', 'xl']}>
          <MobileView content={(
            <div>
              <List>
                {
              [...new Array(7)]
                .map((index) => (
                  <ListItem key={index}>
                    <Card classAttr={classes.SMCard} button />
                  </ListItem>
                ))
            }
              </List>
              <div className={classes.fab}>
                <Fab variant="extended">
                  <Edit />
                  <Modal childComponent={<Card classAttr={classes.card} />} text="Create" color="inherit" />
                </Fab>
              </div>
            </div>
          )}
          />
        </Hidden>
        <Hidden only={['sm', 'xs', 'md']}>
          <DesktopView
            content={(
              <List>
                {[...new Array(7)]
                  .map((index) => (
                    <ListItem key={index}>
                      <Card classAttr={classes.SMCard} button />
                    </ListItem>
                  ))}
              </List>
            )}
          />
        </Hidden>
      </div>
    </div>
  );
}

export default withWidth()(Dashboard);

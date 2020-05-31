import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActions, CardContent, Button, Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cardActionGroup: {
    justifyContent: 'space-evenly',
  },
}));

function CardComponent({
  classAttr, title, body, actionOne, actionTwo,
}) {
  const classes = useStyles();
  return (
    <Card className={classAttr}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActionGroup}>
        <Button size="small">{actionOne}</Button>
        <Button size="small">{actionTwo}</Button>
      </CardActions>
    </Card>
  );
}

CardComponent.propTypes = {
  classAttr: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  actionOne: PropTypes.string,
  actionTwo: PropTypes.string,
};

CardComponent.defaultProps = {
  title: 'Report Title',
  body: 'Report Body',
  actionOne: 'Edit',
  actionTwo: 'Delete',
};

export default CardComponent;

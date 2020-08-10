import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ButtonBase } from '@material-ui/core';

/**
 * Material-ui custom styles
 */
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 60,
    height: 60,
  },
  paper: {
    padding: theme.spacing(1),
    minWidth: 300,
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
  },
  userInfo: {
    marginLeft: 30,
  },
}));

export default function Card({ user, onClick }) {
  const classes = useStyles();

  return (
    <ButtonBase onClick={(event) => onClick(event, user.uid)}>
      <Paper className={classes.paper}>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar
              className={classes.avatar}
              alt="Nombre"
              src={user.avatar}
            ></Avatar>
          </Grid>
          <Grid
            xs={12}
            sm
            item
            container
            direction="column"
            className={classes.userInfo}
            alignItems="flex-start"
          >
            <Typography variant="body1">{user.name}</Typography>
            <Typography variant="body1">{user.surname}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
}

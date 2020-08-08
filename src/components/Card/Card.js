import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './Editor.module.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import styles from './Card.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 60,
    height: 60,
  },
  paper: {
    padding: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Card(data) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center">
        <Grid item>
          <Avatar
            className={classes.avatar}
            alt="Nombre"
            src={data.avatar}
          ></Avatar>
        </Grid>
        <Grid xs={12} sm item container direction="column" alignItems="center">
          <Typography variant="body1">{data.name}</Typography>
          <Typography variant="body1">{data.surname}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

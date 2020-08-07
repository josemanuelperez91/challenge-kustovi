import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './Editor.module.css';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
// import styles from './Grids.module.css';
import Typography from '@material-ui/core/Typography';

export default function Grids() {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={6}
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h5">Con Acceso</Typography>
        <Card></Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h5">Sin Acceso</Typography>
        <Card></Card>
      </Grid>
    </Grid>
  );
}

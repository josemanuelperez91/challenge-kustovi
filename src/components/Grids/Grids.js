import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
import Typography from '@material-ui/core/Typography';

import firebase from '../../config/firebaseConfig';

export default function Grids() {
  const usersRef = firebase.database().ref('users');

  const [users, setUsers] = useState([]);

  usersRef.on('value', function (snapshot) {
    // setUsers(snapshot.val());
    console.log(snapshot.val());
  });

  function filledCard() {
    return users.map((user) => {
      return <Card data={user}></Card>;
    });
  }

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
        <filledCard></filledCard>
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
        <filledCard></filledCard>
      </Grid>
    </Grid>
  );
}

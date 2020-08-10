import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  getUsersAsync,
  changeCurrentUser,
} from '../../app/usersSlice';
export default function Grids() {
  const users = useSelector(selectUsers);

  /**
   * Passes only users with access
   */
  function FilledAccessCards(props) {
    return users
      .filter((user) => user.access)
      .map((user) => {
        return <Card key={user.uid} user={user} {...props}></Card>;
      });
  }
  /**
   * Passes only users without access
   */
  function FilledNoAccessCards(props) {
    return users
      .filter((user) => !user.access)
      .map((user) => {
        return <Card key={user.uid} user={user} {...props}></Card>;
      });
  }
  const dispatch = useDispatch();

  /**
   * Loads users from the database.
   */
  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  /**
   * Changes the state pointing to the selected user.
   */
  const handleClick = (event, key) => {
    dispatch(changeCurrentUser(key));
  };

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
        <FilledAccessCards onClick={handleClick}></FilledAccessCards>
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
        <FilledNoAccessCards onClick={handleClick}></FilledNoAccessCards>
      </Grid>
    </Grid>
  );
}

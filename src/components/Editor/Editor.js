import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import firebase from '../../config/firebaseConfig';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 120,
    height: 120,
  },
  select: {
    minWidth: 120,
  },
  editAvatar: {
    bottom: 40,
    left: 40,
  },
  inputAvatar: {
    display: 'none',
  },
}));
export default function Editor() {
  const classes = useStyles();

  const initialState = {
    name: '',
    surname: '',
    access: '',
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const clickInput = () => {
    const input = document.querySelector('input[name=avatar]');
    input.click();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const usersRef = firebase.database().ref('users');
    const newUserKey = usersRef.push().key;

    usersRef.child(newUserKey).update({
      ...formData,
    });
  };

  return (
    <Grid container justify="center">
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <Grid container alignItems="center" spacing={4}>
          <Grid item>
            <Avatar className={classes.avatar} alt="Nombre" src=""></Avatar>
            <input
              className={classes.inputAvatar}
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
            />
            <Fab
              color="primary"
              className={classes.editAvatar}
              aria-label="edit"
              onClick={clickInput}
            >
              <EditIcon />
            </Fab>
          </Grid>
          <Grid
            sm
            item
            container
            direction="column"
            spacing={1}
            alignItems="flex-start"
          >
            <Grid item>
              <TextField
                value={formData.name}
                onChange={handleChange}
                name="name"
                label="Nombre"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                value={formData.surname}
                onChange={handleChange}
                name="surname"
                label="Apellidos"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.select}>
                <InputLabel>¿Acceso?</InputLabel>
                <Select
                  name="access"
                  value={formData.access}
                  onChange={handleChange}
                  label="¿Acceso?"
                >
                  <MenuItem value={true}>Permitido</MenuItem>
                  <MenuItem value={false}>No permitido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="outlined" color="primary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

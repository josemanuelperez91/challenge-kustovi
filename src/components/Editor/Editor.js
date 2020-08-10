import React, { useState, useEffect } from 'react';

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
import { useDispatch, useSelector } from 'react-redux';

import {
  updateUserAsync,
  selectCurrentUser,
  resetCurrentUser,
} from '../../app/usersSlice';

/**
 * Material-ui custom styles
 */
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
  cancelButton: {
    marginLeft: 10,
  },
}));
export default function Editor() {
  const classes = useStyles();
  const initialState = {
    name: '',
    surname: '',
    access: '',
    avatar: '',
  };
  const [formData, setFormData] = useState({ ...initialState });
  const dispatch = useDispatch();

  /**
   * Handles the state, modified by inputs in the form.
   */
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /**
   * Loads the user data into the form whenever a user is selected.
   */
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    if (currentUser) {
      setFormData({ ...currentUser });
    }
  }, [setFormData, currentUser]);

  /**
   * Opens the file input window when the edit button is clicked.
   */
  const clickInput = () => {
    const input = document.querySelector('input[name=avatar]');
    input.click();
  };

  /**
   * Clears the form inputs.
   */
  const handleCancel = () => {
    dispatch(resetCurrentUser());
    setFormData({ ...initialState });
  };

  /**
   * Manages the submit behaviour.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...initialState });
    dispatch(updateUserAsync(formData));
    dispatch(resetCurrentUser());
  };

  /**
   * Manages the file in order to allow the input file to be controlled.
   */
  function handleFileSelect(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setFormData({
        ...formData,
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <Grid container justify="center">
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container alignItems="center" spacing={4}>
          <Grid item>
            <Avatar
              className={classes.avatar}
              alt="Nombre"
              src={formData.avatar}
            ></Avatar>
            <input
              className={classes.inputAvatar}
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleFileSelect}
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
                required={true}
              />
            </Grid>
            <Grid item>
              <TextField
                value={formData.surname}
                onChange={handleChange}
                name="surname"
                label="Apellidos"
                variant="outlined"
                required={true}
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
                  required={true}
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
              <Button
                className={classes.cancelButton}
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

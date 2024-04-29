import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useAddNewPizzaMutation } from 'src/api/pizza'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'

const InsertPizza = () => {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const initialValuesInputs = {
    nombre: '',
    descripcion:'',
    fecha: '2000-01-01',
    precio: 0,
    ingredientes: '',
    tamaño:''
  }
  const [inputsValues, setinputsValues] = useState(initialValuesInputs);

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setinputsValues({
      ...inputsValues,
      [name]: value
    })
  }
  

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setinputsValues(initialValuesInputs);
  }

   const [addNewPizza, { isLoading, isError }] = useAddNewPizzaMutation();


  const handleAddProduct = async () => {
    try {
      await addNewPizza(inputsValues).unwrap()
      handleClose()
      setinputsValues(initialValuesInputs)
    } catch (error) {
      console.log(error)
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });

  const handleFileChange = ( event ) => { 
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setinputsValues( { 
        ...inputsValues,
        imagen: reader.result
       })
    };
    reader.readAsDataURL( file );

  }
  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Añadir Pizza
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {' '}
          <Link href='#'> Insertar nueva pizza </Link>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={7} style={{ paddingTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='nombre'
                value={inputsValues.nombre}
                onChange={handleInputChange}
                fullWidth
                label='Nombre'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tamaño</InputLabel>
                <Select
                  label='Tamaño'
                  name='tamaño'
                  onChange={handleInputChange}
                  value={inputsValues.tamaño}
                >
                  <MenuItem value='Grande'>Grande</MenuItem>
                  <MenuItem value='Mediano'>Mediano</MenuItem>
                  <MenuItem value='Pequeño'>Pequeño</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='ingredientes'
                value={inputsValues.ingredientes}
                onChange={handleInputChange}
                fullWidth
                type='text'
                label='Ingredientes'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='descripcion'
                value={inputsValues.descripcion}
                onChange={handleInputChange}
                fullWidth
                id='outlined-multiline-static'
                label='Descripcion'
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='date'
                label='Fecha'
                name='fecha'
                value={inputsValues.fecha}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Precio Venta'
                name='precio'
                value={inputsValues.precio}
                onChange={handleInputChange}
              />
            </Grid>
          
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAddProduct} disabled={isLoading} variant='contained' autoFocus>
            {isLoading ? 'Añadiendo producto...' : 'Añadir producto'}
          </Button>
          {isError && <div> Error adding product </div>}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InsertPizza

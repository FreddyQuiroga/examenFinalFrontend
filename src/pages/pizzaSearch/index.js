// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TablePizza from 'src/views/tables/TablePizza'
import InsertPizza from 'src/components/InsertPizza'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'

import { TextField } from '@mui/material'
import { useState } from 'react'
import TablePizzaSearch from 'src/views/tables/TablePizzaSearch'
import { useFindByDescriptionMutation } from '/src/api/pizza'
import { usePriceGreaterThanMutation } from '/src/api/pizza'
import { useGetPizzasByNameStartingWithMutation } from '/src/api/pizza'
import { useSortedByPriceDescMutation } from '/src/api/pizza'
import { useMostExpensivePizzaMutation } from '/src/api/pizza'



import { useEffect } from 'react'

const initialValuesInputs = {
  nombre: '',
  descripcion: '',
  fecha: '2000-01-01',
  precio: 0,
  ingredientes: '',
  tamaño: '',
  descendiente: false,
  pizzaCara: false
}

const pizzasSearch = () => {
  const [inputsValues, setInputsValues] = useState(initialValuesInputs)
  const [dataTable, setDataTable] = useState([])
  const [findByDescription] = useFindByDescriptionMutation()
  const [findPriceGreaterThanMutation] = usePriceGreaterThanMutation()
  const [findPizzasByNameStartingWithMutation] = useGetPizzasByNameStartingWithMutation()
  const [sortedByPriceDesc] = useSortedByPriceDescMutation()
  const [mostExpensivePizza] = useMostExpensivePizzaMutation()

  useEffect(() => {
    const fetchData = async () => {
      if (inputsValues.descripcion) {
        try {
          const { data } = await findByDescription(inputsValues.descripcion)
          setDataTable(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else if (inputsValues.precio) {
        try {
          const { data } = await findPriceGreaterThanMutation(inputsValues.precio)
          setDataTable(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else if (inputsValues.tamaño) {
        try {
          const { data } = await findPizzasByNameStartingWithMutation(inputsValues.tamaño)
          setDataTable(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else if (inputsValues.descendiente) {
        try {
          const { data } = await sortedByPriceDesc()
          setDataTable(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else if (inputsValues.pizzaCara) {
        try {
          const { data } = await mostExpensivePizza()
          setDataTable([data])
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }else {
        setDataTable([])
      }
    }

    fetchData()
  }, [
    inputsValues.descripcion,
    inputsValues.precio,
    inputsValues.descendiente,
    inputsValues.tamaño,
    inputsValues.descendiente,
    inputsValues.pizzaCara,
    findByDescription
  ])

  const handleInputChange = event => {
    const { name, value, type, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value
    setInputsValues({
      ...inputsValues,
      [name]: newValue
    })
  }
  return (
    <Grid container spacing={7} style={{ paddingTop: '5px' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='http://localhost:3001/pizzaSearch/' target='_blank'>
            Consultas Avanzadas en la busqueda de Pizzas
          </Link>
        </Typography>
        <Typography variant='body2'>En la tabla muestra la lista de pizzas disponibles en la Base de Datos.</Typography>
      </Grid>

      <Grid item xs={12} sm={10}>
        <div style={{ display: 'flex' }}>
          <TextField
            name='descripcion'
            value={inputsValues.descripcion}
            onChange={handleInputChange}
            fullWidth
            label='Descripcion'
            style={{ marginRight: '10px' }}
          />
          <TextField
            name='precio'
            value={inputsValues.precio}
            onChange={handleInputChange}
            fullWidth
            label='Precio mayor a'
            style={{ marginRight: '10px' }}
          />

          <FormControl fullWidth>
            <InputLabel>Tamaño</InputLabel>
            <Select label='Tamaño' name='tamaño' onChange={handleInputChange} value={inputsValues.tamaño}>
              <MenuItem value='Grande'>Grande</MenuItem>
              <MenuItem value='Mediano'>Mediano</MenuItem>
              <MenuItem value='Pequeño'>Pequeño</MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormControlLabel
          control={<Checkbox color='primary' />}
          label='Descendiente'
          name='descendiente'
          checked={inputsValues.descendiente}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={<Checkbox color='primary' />}
          label='La Pizza mas cara'
          name='pizzaCara'
          checked={inputsValues.pizzaCara}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Productos' titleTypographyProps={{ variant: 'h6' }} />
          <TablePizzaSearch data={dataTable} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default pizzasSearch

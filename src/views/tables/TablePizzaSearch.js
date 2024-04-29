// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// Aqui consumo mi API
import { useGetPizzasQuery } from '/src/api/pizza'
import UpdatePizza from 'src/components/UpdatePizza'
import DeletePizza from 'src/components/DeletePizza'
import { useState } from 'react'


const TablePizzaSearch = ({ data: pizzas }) => {
  // const [pizzas, setPizzas] = useState([]);
  console.log( pizzas )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='right'>Descripcion</TableCell>
            <TableCell align='right'>Fecha</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='left'>Ingredientes</TableCell>
            <TableCell align='right'>Tamaño</TableCell>
            <TableCell align='right'>Actualizar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map(row => (
            <TableRow
              key={row.nombre}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.nombre}
              </TableCell>
              <TableCell align='right'>{row.descripcion}</TableCell>
              <TableCell align='right'>{row.fecha}</TableCell>
              <TableCell align='right'>{row.precio}</TableCell>
              <TableCell align='left'>{row.ingredientes}</TableCell>
              <TableCell align='right'>{row.tamaño}</TableCell>
              <TableCell align='right'> 
               <UpdatePizza pizza={ row } />
              </TableCell>
              <TableCell align='right'> 
               <DeletePizza id={ row._id } />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablePizzaSearch

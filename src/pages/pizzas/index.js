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

const pizzasList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

      <InsertPizza />
      <Divider sx={{ mt: 5, mb: 1 }} />
    </Grid>

      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Lista de Pizzas
          </Link>
        </Typography>
        <Typography variant='body2'>En la tabla muestra la lista de pizzas disponibles en la Base de Datos.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Productos' titleTypographyProps={{ variant: 'h6' }} />
          <TablePizza />
        </Card>
      </Grid>
    </Grid>
  )
}

export default pizzasList

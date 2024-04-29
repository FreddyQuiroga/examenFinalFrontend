import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useGetAllProductsQuery } from 'src/api/Product'
import DeletePizza from '../DeletePizza'
import UpdatePizza from '../UpdatePizza'


interface RowType {
  idProducto: number;
  categoria: number;
  codigo: string;
  imagen: string;
  nombreProducto: string;
  precioVenta: number;
  estado: number;
  alto: number;
  ancho: number;
  espesor: number;
  marca: string;
  tipo: string;
  descripcion: string;
}

const ProductList = () => {

    // @ts-ignore
  const { data, isLoading} = useGetAllProductsQuery();
  console.log( data )
  return (
    <>
  
    { isLoading ? <h5>Cargando..</h5> :
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>

            <TableCell>Imagen</TableCell>
            <TableCell>Cod I</TableCell>
            <TableCell align='right'>Nombre</TableCell>
            <TableCell align='right'>Tipo </TableCell>
            <TableCell align='right'>Categoria</TableCell>
            <TableCell align='right'>Marca </TableCell>
            <TableCell align='right'>Descripcion </TableCell>
            <TableCell align='right'>Alto</TableCell>
            <TableCell align='right'>Ancho</TableCell>
            <TableCell align='right'>Esp</TableCell>
            <TableCell align='right'>Actualizar</TableCell>
            <TableCell align='right'>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product: RowType) => (
            <TableRow
              key={product.idProducto}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='right'>
              {product.imagen && 
                  <img src={ `/images/products/${product.imagen}`} alt='Imagen Producto' style={{ maxWidth: '100%', height: '80px' }} />
              }
              </TableCell>
              <TableCell component='th' scope='row'>
                {product.codigo}
              </TableCell>
              <TableCell align='right'>{product.nombreProducto}</TableCell>
              <TableCell align='right'>{product.tipo}</TableCell>
              <TableCell align='right'>{product.categoria}</TableCell>
              <TableCell align='right'>{product.marca}</TableCell>
              <TableCell align='right'>{product.descripcion ? product.descripcion : 'No hay descripcion'}</TableCell>
              <TableCell align='right'>{product.alto}</TableCell>
              <TableCell align='right'>{product.ancho}</TableCell>
              <TableCell align='right'>{product.espesor}</TableCell>
              <TableCell align='right'>
               <UpdatePizza id={ product.idProducto } />
              </TableCell>
              <TableCell align='right'>
              <DeletePizza id={ product.idProducto } />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            }
    </>
  )
}

export default ProductList

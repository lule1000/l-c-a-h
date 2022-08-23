import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

export default function CustomizedTables({ cartItems, clearCart, removeItem, setRemoveForm }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Subtotal</StyledTableCell>
            <StyledTableCell align="center"><button className="bg-danger bgHover rounded" onClick={clearCart}>Clear Cart</button></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map(({ name, price, quantity, id, stock }) => (
            quantity > stock ?
              <>
                {setRemoveForm(false)}
              </> :
              <StyledTableRow key={id}>
                <StyledTableCell align="center">{name}</StyledTableCell>
                <StyledTableCell align="center">${price}</StyledTableCell>
                <StyledTableCell align="center">{quantity}</StyledTableCell>
                <StyledTableCell align="center">${price * quantity}</StyledTableCell>
                <StyledTableCell align="center"><DeleteIcon className='text-danger bgHover' onClick={() => removeItem(id)} /></StyledTableCell>
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

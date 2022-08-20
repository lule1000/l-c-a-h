import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useOrderContext } from "./context/OrdersContext";
import { Link } from "react-router-dom";

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


export default function Orders() {
    const { orderData, orderItems } = useOrderContext();
    return orderItems.length === 0 ?
        <div className="text-center">
            <h1 className="mt-5">You haven`t orders...</h1>
            <Link to={'/'}><button className="mt-5 bg-dark text-white bgHover rounded">Back to Home</button></Link>
        </div> :
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="center">Subtotal</StyledTableCell>
                        <StyledTableCell align="center">Number of order</StyledTableCell>
                        <StyledTableCell align="center">State</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderItems.map(({ name, price, quantity, id }) => (
                        <StyledTableRow key={id}>
                            <StyledTableCell align="center">{name}</StyledTableCell>
                            <StyledTableCell align="center">${price}</StyledTableCell>
                            <StyledTableCell align="center">{quantity}</StyledTableCell>
                            <StyledTableCell align="center">${quantity * price}</StyledTableCell>
                            <StyledTableCell align="center">{orderData}</StyledTableCell>
                            <StyledTableCell align="center">In confirmation</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
}
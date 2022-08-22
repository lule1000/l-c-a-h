import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useOrderContext } from "../context/OrdersContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './cartWidget.scss';
import swal from 'sweetalert';
import CustomizedTables from "./Table";

const CartCheckout = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { cartItems, clearCart, removeItem, sendOrder, updateStock } = useCartContext();
    const { setOrderItems, setOrderData } = useOrderContext();

    useEffect(() => {
        let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return cartItems.length === 0 ?
        <div className="text-center">
            <h1 className="mt-5">You haven`t products in the cart...</h1>
            <Link to={'/'}><button className="mt-5 bg-dark text-white bgHover rounded">Back to Home</button></Link>
        </div> :

        <div className="mt-4">
            <CustomizedTables cartItems={cartItems} clearCart={clearCart} removeItem={removeItem} />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: ''
                }}
                validate={({ name, email, phone }) => {
                    let errors = {};
                    //VALIDACION NOMBRE
                    if (!name) {
                        errors.name = 'Please enter a name'
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(name)) {
                        errors.name = 'The name can only contain letters and spaces'
                    }
                    //VALIDACION CORREO
                    if (!email) {
                        errors.email = 'Please enter an email'
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                        errors.email = 'Email can only have letters, numbers, dots, dashes, and underscores.'
                    }
                    //VALIDACION NUMERO
                    if (!phone) {
                        errors.phone = 'Please enter a phone'
                    }
                    return errors
                }}
                onSubmit={(valores, { resetForm }) => {
                    resetForm();
                    updateStock(cartItems);
                    sendOrder(totalPrice, valores, setOrderData, setOrderItems);
                    swal("Successful order!", "Go to orders and you can see your request", "success");
                }}
            >
                {({ errors }) => (
                    <Form className="form m-5 d-flex flex-column border p-2">
                        <div className="d-flex flex-column">
                            <label className="ms-2">Name:</label>
                            <Field
                                placeholder="John Doe"
                                label="Name:"
                                type="text"
                                name="name"
                                className="w-25 m-1 form-control"
                            />
                            <ErrorMessage name="name" component={() => (<p className="ms-2 text-danger">{errors.name}</p>)} />
                        </div>
                        <div className="d-flex flex-column">
                            <label className="ms-2">Email:</label>
                            <Field
                                placeholder="johndoe@hotmail.com"
                                label="Email:"
                                type="email"
                                name="email"
                                className="w-25 m-1 form-control"
                            />
                            <ErrorMessage name="email" component={() => (<p className="ms-2 text-danger">{errors.email}</p>)} />
                        </div>
                        <div className="d-flex flex-column">
                            <label className="ms-2">Phone</label>
                            <Field
                                placeholder="011-1555439064"
                                label="Phone:"
                                type="tel"
                                name="phone"
                                className="w-25 m-1 form-control"
                            />
                            <ErrorMessage name="phone" component={() => (<p className="ms-2 text-danger">{errors.phone}</p>)} />
                        </div>
                        <div className="ms-1">
                            <Button variant="contained" type="submit" endIcon={<SendIcon />}>Send</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
}

export default CartCheckout;
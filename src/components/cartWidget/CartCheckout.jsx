import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ImBin } from "react-icons/im"
import { Link } from "react-router-dom";
import { useOrderContext } from "../context/OrdersContext";
import './cartWidget.scss';

const CartCheckout = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [removeForm, setRemoveForm] = useState(true);
    const { cartItems, clearCart, removeItem, sendOrder } = useCartContext();
    const { setOrderItems, setOrderData, orderItems } = useOrderContext();

    useEffect(() => {
        let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return cartItems.length === 0 & orderItems.length === 0 ?
        <div className="text-center">
            <h1 className="mt-5">You haven`t products in the cart...</h1>
            <Link to={'/'}><button className="mt-5 bg-dark text-white bgHover rounded">Back to Home</button></Link>
        </div> :
        <div className="mt-4">
            <table className="table text-center container-fluid">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th><button className="bg-danger bgHover rounded" onClick={clearCart}>Clear Cart</button></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(({ name, price, quantity, id }) => (
                        <tr>
                            <td><b>{name}</b></td>
                            <td><b>${price}</b></td>
                            <td><b>{quantity}</b></td>
                            <td><b>${price * quantity}</b></td>
                            <td><ImBin className='text-danger bgHover' onClick={() => removeItem(id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {removeForm ?
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
                        resetForm()
                        setRemoveForm(false)
                        sendOrder(totalPrice, valores, setOrderData, setOrderItems);
                    }}
                >
                    {({ errors }) => (
                        <Form className="formm m-5 d-flex flex-column border">
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
                            <div className="d-flex align-items-center">
                                <h3 className="ms-2 mt-1 me-5">Total:{`$${totalPrice}`}</h3>
                                <button className="mt-1 bg-primary text-white rounded bgHover" type="submit">Send order</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                :
                <div className="text-center">
                    <h4 className="sendForm mt-5 mb-3">Form sent successfully!</h4>
                    <Link to={'/orders'}><button className="bg-dark text-white bgHover rounded">Go to Orders</button></Link>
                </div>
            }
        </div>
}

export default CartCheckout;
import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Context } from "../Context";
import data from "../data";
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import '../App.css'
import { makeID } from '../Service/makeID';

export default function Cart() {

    const [items, updateItem, clearItems] = useContext(Context);
    const [cart, setCart] = useState([]);
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [instructions, setInstructions] = useState("")
    const [processing, setProcessing] = useState(false)
    const lastOrder = localStorage.getItem("lastOrder")
    const history = useHistory()

    const orderID = makeID(10)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setProcessing(false)
        setOpen(false);
        setError("")
        setErrorName("")
        setErrorPhone("")
        setName("")
        setPhone("")
        setInstructions("")
        setSuccess("")
    };

    const totalPrice = Object.keys(items).reduce((acc, curr) => {
        const [group, item] = curr.split("-");
        const amount = items[curr] * data[group][item].price;
        return acc + amount;
    }, 0);

    useEffect(() => {
        let arr = []
        Object.keys(items).reduce((acc, curr) => {
            const [group, item] = curr.split("-");
            let newCart = { "name": data[group][item].name, "quantity": items[curr], "amount": items[curr] * data[group][item].price, "type": group, "index": item, "type1": data[group][item].type, "price": data[group][item].price }
            if (items[curr]) {
                arr.push(newCart)
            }
        }, 0)
        setCart(arr)
        window.scrollTo(0, 0)
    }, [updateItem, items])

    const placeOrder = () => {
        if (name.length === 0) {
            setErrorName('Please Enter Name')
            return
        }
        let isnum = /^\d+$/.test(phone);
        if (phone.length !== 10 && isnum) {
            setErrorName("")
            setErrorPhone('Please Enter Valid Phone Number')
            return
        }
        setProcessing(true)
        let final = []
        var seen = [];
        final.push({ 'Order ID': orderID, 'Customer Name': name, 'phone': phone })
        cart.forEach((item) => {
            final.push({ 'name': item.name, "quantity": item.quantity, "amount": item.amount })
        })
        instructions && final.push({ "instructions": instructions })
        final.push({ 'total price': totalPrice })
        let message = JSON.stringify(final, function (key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }, '\t')
        fetch(`https://api.telegram.org/bot6240181449:AAHQnBaEIpgcy_TeC-p89cRRHovqNAsMD9c/sendMessage?chat_id=5448964260&text=${encodeURI(message)}`).then((response) => {
            if (response.ok) {
                handleClose()
                Swal.fire({
                    title: 'Success',
                    text: "Your order has been placed!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            if (lastOrder) {
                                let order;
                                order = JSON.parse(lastOrder)
                                order.push({ 'orderId': orderID, 'date': Date.now(), 'order': cart, 'cname': name, 'cphone': phone, 'instructions': instructions, 'total': totalPrice })
                                localStorage.setItem('lastOrder', JSON.stringify(order))
                            } else {
                                let order = []
                                order.push({ 'orderId': orderID, 'date': Date.now(), 'order': cart, 'cname': name, 'cphone': phone, 'instructions': instructions, 'total': totalPrice })
                                localStorage.setItem('lastOrder', JSON.stringify(order))
                            }
                            setProcessing(false)
                            clearItems()
                            history.push('/previousOrder')
                        }
                    })

            } else {
                setProcessing(false)
                Swal.fire({
                    title: 'Error',
                    text: "Error Occured, Please try again!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        }).catch((e) => {
            setProcessing(false)
            Swal.fire({
                title: 'Error',
                text: "Error Occured, Please try again!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            })
        }
        )
    }

    const handleClearCart = () => {
        Swal.fire({
            title: 'Clear cart!',
            text: "Are you sure to clear cart?",
            icon: 'danger',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    clearItems()
                    Swal.fire({
                        title: 'Success',
                        text: "Cart cleared!",
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        history.push('/')
                    })
                }
            })
    }

    return (
        <>
            {success && <Alert severity="success" action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setSuccess("");
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>{success}</Alert>}
            {error && <Alert severity="error" action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setError("");
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>{error}</Alert>}
            <Dialog open={open} onClose={handleClose} style={{ fontFamily: 'Sen' }}>
                <DialogTitle style={{ fontFamily: 'Sen', color: '#473d72' }}>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: 'Sen', color: '#473d72' }}>
                        Please provide details to place order
                    </DialogContentText>
                    <TextField
                        color="secondary"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        helperText={errorName && "Please enter a name"}
                        error={errorName}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        fullWidth
                        variant="standard"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        helperText={errorPhone && "Please enter a valid phone number"}
                        error={errorPhone}
                        color="secondary"
                    />
                    <TextField
                        margin="dense"
                        id="instructions"
                        label="instructions"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: '#473d72', fontFamily: 'Sen' }} onClick={handleClose}>Cancel</Button>
                    {!processing ? <Button style={{ color: '#473d72', fontFamily: 'Sen' }} onClick={() => placeOrder()}>Place Order</Button> : <Button style={{ color: '#473d72', fontFamily: 'Sen' }}>Placing Order ...</Button>}
                </DialogActions>
            </Dialog >
            <div className="menu">
                <Navbar bg="light" variant="light" sticky="top" style={{ height: '50px' }}>
                    <Container style={{ padding: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <IconButton>
                                <Link to='/' style={{ color: '#473d72', width: '100%' }}>
                                    <ArrowBackIcon />
                                </Link>
                            </IconButton>
                            <div style={{ fontSize: '25px', color: "#473d72" }}>
                                Cart
                            </div>
                        </div>
                        {totalPrice > 0 && <div onClick={() => handleClearCart()}>
                            <div style={{ backgroundColor: "#473d72", color: 'white', width: 'fit-content', padding: '7px', borderRadius: '10px', cursor: 'pointer' }}>Clear cart <DeleteIcon sx={{ fontSize: '18px' }} /></div>
                        </div>}
                    </Container>
                </Navbar>
                {cart.length > 0 ? <><div style={{ minHeight: window.innerHeight - 185 }}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {cart && cart.map((ite) => (
                                    <TableRow style={{ color: "#473d72" }} key={ite.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="left" style={{ color: "#473d72", fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Sen' }}>
                                            {ite.type1 && <img alt="" src={ite.type1 === "veg" ? "https://img.icons8.com/color/512/vegetarian-food-symbol.png" : "https://img.icons8.com/color/512/non-vegetarian-food-symbol.png"} style={{ height: "20px", width: "20px" }} />}
                                            <div>
                                                <div style={{ color: "#473d72" }}>{ite.name}</div>
                                                <div style={{ color: "#473d72" }}>&#8377;{ite.price}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" style={{ color: "#473d72", fontSize: '1.2rem' }}>
                                            <div style={{ justifyContent: 'flex-end', display: 'grid' }}>
                                                <div className='IncDecButton'>
                                                    <IconButton onClick={() => {
                                                        updateItem(ite.type, ite.index, ite.quantity - 1)
                                                    }}>
                                                        {ite.quantity === 1 ? <DeleteIcon sx={{ fontSize: '14px' }} className="icon" /> : <RemoveCircleOutlineRoundedIcon sx={{ fontSize: '14px' }} className="icon" />}
                                                    </IconButton>
                                                    <strong style={{ fontFamily: 'Sen' }}>{ite.quantity}</strong>
                                                    <IconButton onClick={() => {
                                                        updateItem(ite.type, ite.index, ite.quantity + 1)
                                                    }}>
                                                        <AddCircleOutlineRoundedIcon sx={{ fontSize: '14px' }} className="icon" />
                                                    </IconButton>
                                                </div>
                                                <div style={{ fontFamily: 'Sen', color: "#473d72" }}>
                                                    &#8377;{ite.amount}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                </>
                    :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', minHeight: window.innerHeight - 135 }}>
                        <div>No items</div>
                    </div>
                }
                {totalPrice > 0 && <Navbar bg="light" variant="light" sticky="bottom">
                    <div style={{ width: '100%' }}>
                        <div className='total'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span className="total-title">
                                    <div>
                                        &#8377;{totalPrice}
                                    </div>
                                    <div style={{ fontSize: '8px' }}>
                                        Extra Charges may apply
                                    </div>
                                </span>
                            </div>
                            <Button onClick={() => handleClickOpen()} sx={{
                                fontFamily: 'Sen', fontSize: '14px', width: '140px', borderRadius: '10px', height: '30px', color: 'white', backgroundColor: '#473d72', '&:hover': {
                                    color: 'white',
                                    backgroundColor: '#473d72',
                                    borderColor: '#473d72',
                                }
                            }} variant="contained">Place Order</Button>
                        </div>
                    </div>
                </Navbar>}
            </div>


        </>
    )
}
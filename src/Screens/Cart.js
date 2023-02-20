import React, { useContext, useEffect, useState }  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Context } from "../Context";
import data from "../data";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Cart() {

    const [items, updateItem, clearItems] = useContext(Context);
    const [cart, setCart] = useState([]);

    const totalPrice = Object.keys(items).reduce((acc, curr) => {
        const [group, item] = curr.split("-");
        const amount = items[curr] * data[group][item].price;
        return acc + amount;
      }, 0);

    useEffect(() => {
        let arr = []
        Object.keys(items).reduce((acc, curr) => {
            const [group, item] = curr.split("-");
            let newCart = {"name": data[group][item].name, "quantity": items[curr], "amount" : items[curr] * data[group][item].price, "type": group, "index": item, "type1":  data[group][item].type, "price": data[group][item].price }
            if(items[curr]){
                arr.push(newCart)
            }
        },0)
        setCart(arr)
    },[updateItem, items])

    return (
        <>
            <div className="menu">
                <Navbar bg="light" variant="light" sticky="top" style={{height: '50px'}}>
                    <Container>
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <IconButton>
                                <Link to='/' style={{ color: '#473d72' }}>
                                    <ArrowBackIcon />
                                </Link>
                            </IconButton>
                            <div style={{ fontSize: '25px',color: "#473d72" }}>
                                Cart
                            </div>
                        </div>
                        {totalPrice > 0 && <div onClick={() => clearItems()}>
                            <div style={{ backgroundColor: "#473d72", color: 'white', width: 'fit-content', padding: '5px 10px', borderRadius: '10px', cursor: 'pointer' }}><DeleteIcon /> Clear cart</div>
                        </div>}
                    </Container>
                </Navbar>
                {cart.length > 0 ? <><div style={{minHeight: '60vh'}}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                {cart && cart.map((ite) => (
                                    <TableRow style={{color: "#473d72"}} key={ite.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="left" style={{color: "#473d72",fontSize: '1.2rem', cursor: 'pointer',fontFamily: 'Sen'}}>
                                            {ite.type1 && <img alt="" src={ite.type1 ==="veg" ? "https://img.icons8.com/color/512/vegetarian-food-symbol.png" : "https://img.icons8.com/color/512/non-vegetarian-food-symbol.png"} style={{height: "20px", width: "20px"}} />}
                                            <div>
                                                <div style={{color: "#473d72"}}>{ite.name}</div>
                                                <div style={{color: "#473d72"}}>&#8377;{ite.price}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" style={{color: "#473d72",fontSize: '1.2rem'}}>
                                            <div style={{ justifyContent: 'flex-end', display: 'grid' }}>
                                                <div className='IncDecButton'>
                                                    <IconButton onClick={() => {
                                                        updateItem(ite.type, ite.index, ite.quantity-1)
                                                    }}>
                                                        {ite.quantity === 1 ? <DeleteIcon sx={{fontSize: '14px'}} className="icon" /> : <RemoveCircleOutlineRoundedIcon sx={{fontSize: '14px'}} className="icon" /> }
                                                    </IconButton>
                                                    <strong style={{fontFamily: 'Sen'}}>{ite.quantity}</strong>
                                                    <IconButton onClick={() => {
                                                        updateItem(ite.type, ite.index, ite.quantity+1)
                                                    }}>
                                                        <AddCircleOutlineRoundedIcon sx={{fontSize: '14px'}} className="icon" />
                                                    </IconButton>
                                                </div>
                                                <div style={{fontFamily: 'Sen',color: "#473d72"}}>
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
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px'}}>
                    <div>No items</div>
                </div>
                }
                {totalPrice > 0 && <Navbar bg="light" variant="light" sticky="bottom" style={{height: '50px'}}> 
                    <Container className='total'>
                        <div className="total-title">
                                Total: 
                            <div style={{fontSize: '8px',color: "#473d72"}}>
                                Extra Charges may apply
                            </div>
                        </div>
                        <div className='total-price'>
                            &#8377;{totalPrice}          
                        </div>
                    </Container>
                </Navbar>}
            </div>
            
            
        </>
    )
}
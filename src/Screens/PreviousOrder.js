import React from 'react';
import { IconButton } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function PreviousOrder() {

    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"))
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getDate = (date) => {
        let t = new Date(date)
        return  `${months[t.getMonth() - 1]} ${t.getDate()},${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
    }

    return (
        <div className="menu">
            <Navbar bg="light" variant="light" sticky="top" style={{height: '50px'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <IconButton>
                            <Link to='/' style={{ color: '#473d72' }}>
                                <ArrowBackIcon />
                            </Link>
                        </IconButton>
                        <div style={{ fontSize: '25px',color: "#473d72" }}>
                            Previous Orders
                        </div>
                    </div>
            </Navbar>
            {lastOrder.length > 0 ? <><div style={{minHeight: '60vh', padding: '20px'}}>
            {lastOrder && lastOrder.map((ite) => (
                <p>
                    <strong>{getDate(ite.date)}</strong>
                    <div>{ite.cname} ({ite.cphone})</div>
                    <div style={{ display: 'flex' , flexDirection: 'row'}}>
                        {ite.order && ite.order.map((food) => {
                            return <>
                            <div>{food.name} ({food.quantity})&nbsp;</div>
                        </>
                        })}         
                    </div>
                    <div>Total:&nbsp;&nbsp;&#8377;{ite.total}</div>              
                </p>
            ))}
                </div>
                </>
            :
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px'}}>
                <div>No items</div>
            </div>
            }
        </div>
    )
}
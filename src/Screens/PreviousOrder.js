import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function PreviousOrder() {

    const [lastOrder, setLastorder] = useState([])


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDate = (date) => {
        let t = new Date(date)
        return `${t.getDate()} ${months[t.getMonth() - 1]} ${t.getFullYear()} at ${t.getHours()}:${t.getMinutes()}`
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        let order = JSON.parse(localStorage.getItem("lastOrder"))
        setLastorder(order.reverse())
    }, [])

    return (
        <div className="menu" style={{ minHeight: window.innerHeight - 80 }}>
            <Navbar bg="light" variant="light" sticky="top" style={{ height: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <IconButton>
                        <Link to='/' style={{ color: '#473d72' }}>
                            <ArrowBackIcon />
                        </Link>
                    </IconButton>
                    <div style={{ fontSize: '25px', color: "#473d72" }}>
                        Previous Orders
                    </div>
                </div>
            </Navbar>
            {lastOrder?.map((ite, index) => (
                <div className='previous_order' key={index}>
                    <div className='user_details'>
                        <div className='orderby'>Ordered By</div>
                        <div className='name'>{ite.cname}</div>
                        <div className='phone'>({ite.cphone})</div>
                    </div>
                    <div className='order_list'>
                        <ul>
                            {ite.order && ite.order.map((food, index) => {
                                return <li key={index}>x{food.quantity} {food.name}</li>
                            })}
                        </ul>
                    </div>
                    <div className='date_price'>
                        <div className='date'>{getDate(ite.date)}</div>
                        <div>&#8377;<b>{ite.total}</b></div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import PrevOrder from '../Components/PrevOrder';

export default function PreviousOrder() {

    const [lastOrder, setLastorder] = useState([])

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
                <PrevOrder ite={ite} index={index} lastOrder={lastOrder} />
            ))
            }
        </div>
    )
}
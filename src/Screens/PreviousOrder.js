import React from 'react';
import { IconButton } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function PreviousOrder() {

    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"))
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDate = (date) => {
        let t = new Date(date)
        return `${months[t.getMonth() - 1]} ${t.getDate()},${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
    }

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
            <table style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User Details</th>
                        <th>Items</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {lastOrder.length > 0 ? <>
                        {lastOrder && lastOrder.map((ite, index, arr) => (
                            <tr style={{ borderBottom: index !== arr.length - 1 && '1px solid #473d72' }}>
                                <td>
                                    <div>{getDate(ite.date)}</div>
                                </td>
                                <td>
                                    <div>
                                        <div>{ite.cname}</div>
                                        <div>{ite.cphone}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {ite.order && ite.order.map((food, index) => {
                                            return <ul>
                                                <li>{food.name}({food.quantity})&nbsp;</li>
                                            </ul>
                                        })}
                                    </div>
                                </td>
                                <td>
                                    <div>&#8377;<b>{ite.total}</b></div>
                                </td>
                            </tr>

                        ))}


                    </>
                        :
                        <tr>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                    <div>No items</div>
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
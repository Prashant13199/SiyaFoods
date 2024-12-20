import React, { useEffect, useState } from 'react'
import { getDate, timeDiff } from '../Service/getDate';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

export default function PrevOrder({ ite, index, lastOrder }) {

    const [time, setTime] = useState(120 - timeDiff(Date.now(), ite.date))
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTime(120 - timeDiff(Date.now(), ite.date))
        }, 1000)
    }, [time])

    const cancelOrder = () => {
        setProcessing(true)
        let order = [];
        Object.entries(lastOrder.reverse()).forEach((key) => {
            if (ite.orderId !== key[1].orderId) {
                order.push(key[1])
            }
        })
        Object.entries(lastOrder).forEach((key) => {
            if (ite.orderId === key[1].orderId) {
                order.push({ 'orderId': ite.orderId, 'date': Date.now(), 'order': ite.order, 'cname': ite.cname, 'cphone': ite.cphone, 'instructions': ite.instructions, 'total': ite.total, 'cancelled': true })
            }
        })
        localStorage.setItem('lastOrder', JSON.stringify(order))
        let message = `Order ID ${ite.orderId} has been cancelled`
        fetch(`https://api.telegram.org/bot6240181449:AAHQnBaEIpgcy_TeC-p89cRRHovqNAsMD9c/sendMessage?chat_id=5448964260&text=${encodeURI(message)}`).then((response) => {
            if (response.ok) {
                Swal.fire({
                    title: 'Success',
                    text: "Your order has been cancelled!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            setProcessing(false)
                            window.location.reload()
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
        })
    }

    return (
        <div className='previous_order' key={index}>
            <div>
                Order ID: {ite.orderId}
            </div>
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
            {ite.instructions && <div className='date_price'>
                <div className='instructions'>Instructions: {ite.instructions}</div>
            </div>}
            <div className='date_price'>
                <div className='date'>{getDate(ite.date)}</div>
                <div>&#8377;<b>{ite.total}</b></div>
            </div>
            {time > 0 && !ite?.cancelled && <div>
                <Button variant='outlined' className='cancelButton' disabled={processing} onClick={() => cancelOrder()}>Cancel order ({time}s)</Button>
            </div>}
            {ite.cancelled && <div className='cancelled'>Cancelled</div>}
        </div>
    )
}

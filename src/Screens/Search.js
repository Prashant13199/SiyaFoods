import React, { useEffect, useState, useContext } from 'react'
import ExtraSingle from '../Components/ExtraSingle';
import MainsSingle from '../Components/MainsSingle';
import data from '../data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Navbar from 'react-bootstrap/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from "../Context";
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';

export default function Search() {

    const [meals, setMeals] = useState([])
    const[value, setValue] = useState("")
    const [items] = useContext(Context);

    const totalPrice = Object.keys(items).reduce((acc, curr) => {
        const [group, item] = curr.split("-");
        const amount = items[curr] * data[group][item].price;
        return acc + amount;
      }, 0);

    useEffect(() => {
        if(value){
            let arr = []
            data.mains.map((item, index) => {
                if(item.name.toLowerCase().includes(value.toLowerCase()) && item.name.toLowerCase().match(value.toLowerCase())){
                    arr.push({"item": item, "index": index, "type" : 'mains'})
                }
            })
            data.sides.map((item, index) => {
                if(item.name.toLowerCase().includes(value.toLowerCase()) && item.name.toLowerCase().match(value.toLowerCase())){
                    arr.push({"item": item, "index": index, "type" : 'sides'})
                }
            })
            data.drinks.map((item, index) => {
                if(item.name.toLowerCase().includes(value.toLowerCase()) && item.name.toLowerCase().match(value.toLowerCase())){
                    arr.push({"item": item, "index": index, "type" : 'drinks'})
                }
            })
            data.shakes.map((item, index) => {
                if(item.name.toLowerCase().includes(value.toLowerCase()) && item.name.toLowerCase().match(value.toLowerCase())){
                    arr.push({"item": item, "index": index, "type" : 'shakes'})
                }
            })
            setMeals(arr)
        }else{
            setMeals([])
        }
    },[value])
    
    const handleChange = (e) => {
        setValue(e)
    }

    return (
        <div className='menu'>
            <Navbar bg="light" variant="light" sticky="top">
                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <IconButton aria-label="menu">
                        <Link to='/' style={{ color: '#473d72' }}>
                            <ArrowBackIcon />
                        </Link>
                    </IconButton>
                    <InputBase
                        autoFocus   
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Dish"
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    {value && <IconButton style={{ color: '#473d72' }} onClick={() => setValue("")}>
                        <CloseIcon />
                    </IconButton>}
                </Paper>
            </Navbar>
            <div style={{margin: '10px', minHeight: '60vh'}}>
                {meals && meals.map((item) => {
                    return item.type==="mains" ? <MainsSingle meal={item.item} index={item.index} type={item.type} key={item.item.name} />
                    : <ExtraSingle item={item.item} index={item.index} type={item.type} key={item.item.name} />
                })}
            </div>
            {totalPrice> 0 && <Navbar bg="light" variant="light" sticky="bottom" style={{height: '50px'}}>
                <Container className='total'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span className="total-title">
                        <div>
                            &#8377;{totalPrice}
                        </div>
                        <div style={{fontSize: '8px'}}>
                            Extra Charges may apply
                        </div>
                        </span>
                    </div>
                    <Link to="/cart" style={{textDecoration: 'none'}}>
                        <Button sx={{fontFamily: 'Sen',fontSize: '14px',borderRadius: '10px',height: '30px', color: 'white',backgroundColor: '#473d72','&:hover': {
                            color: 'white',
                            backgroundColor: '#473d72',
                            borderColor: '#473d72',
                        },}} variant="contained">View cart</Button>
                    </Link>
                </Container>
            </Navbar>}
        </div>
    )
}

import React, { useState, useContext, useEffect } from 'react'
import Extras from '../Components/Extras';
import Mains from '../Components/Mains';
import data from '../data';
import Modal from 'react-bootstrap/Modal';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../Context';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  const[veg, setVeg] = useState(false)
  const[nonveg, setNonVeg] = useState(false)
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [mains, setMains] = useState([])
  const [sides, setSides] = useState([])
  const [drinks, setDrinks] = useState([])
  const [shakes, setShakes] = useState([])

  const [items] = useContext(Context);

  const totalPrice = Object.keys(items).reduce((acc, curr) => {
    const [group, item] = curr.split("-");
    const amount = items[curr] * data[group][item].price;
    return acc + amount;
  }, 0);

  useEffect(() => {
    let arrayMains = []
      data.mains.map((meal, index) => {
        if(veg && meal.type === 'veg') {
          arrayMains.push({"meal": meal, "index": index})
        }else if(nonveg && meal.type === 'non-veg') {
          arrayMains.push({"meal": meal, "index": index})
        }else if(!veg && !nonveg) {
          arrayMains.push({"meal": meal, "index": index})
        }
      })
    setMains(arrayMains)

    let arraySides = []
      data.sides.map((meal, index) => {
        if(veg && meal.type === 'veg') {
          arraySides.push({"meal": meal, "index": index})
        }else if(nonveg && meal.type === 'non-veg') {
          arraySides.push({"meal": meal, "index": index})
        }else if(!veg && !nonveg) {
          arraySides.push({"meal": meal, "index": index})
        }
      })
    setSides(arraySides)

    let arrayDrinks = []
      data.drinks.map((meal, index) => {
        if(veg && meal.type === 'veg') {
          arrayDrinks.push({"meal": meal, "index": index})
        }else if(nonveg && meal.type === 'non-veg') {
          arrayDrinks.push({"meal": meal, "index": index})
        }else if(!veg && !nonveg) {
          arrayDrinks.push({"meal": meal, "index": index})
        }
      })
    setDrinks(arrayDrinks)

    let arrayShakes = []
      data.shakes.map((meal, index) => {
        if(veg && meal.type === 'veg') {
          arrayShakes.push({"meal": meal, "index": index})
        }else if(nonveg && meal.type === 'non-veg') {
          arrayShakes.push({"meal": meal, "index": index})
        }else if(!veg && !nonveg) {
          arrayShakes.push({"meal": meal, "index": index})
        }
      })
    setShakes(arrayShakes)

  },[veg, nonveg])

  const list = [
    {"name": "Main Course", "id": 'mains', "count": mains.length }, 
    {"name": "Sides", "id": 'sides', "count": sides.length}, 
    {"name": "Drinks", "id": 'drinks', "count": drinks.length}, 
    {"name": "Shakes", "id": 'shakes', "count": shakes.length}, 
  ]

  const handleChangeVeg = () => {
    setNonVeg(false)
    setVeg(!veg)
  }

  const handleChangeNonVeg = () => {
    setNonVeg(!nonveg)
    setVeg(false)
  }

  const handleScroll = (id) => { 
    handleClose1()
    document.getElementById(id).children[0].children[0].click()
    var element = document.getElementById(id);
    var headerOffset = 80;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
  }

  return (
    <>
      <Modal size="sm" show={show1} onHide={handleClose1} centered>
        <Modal.Body>
          <div style={{ maxHeight: '50vh', overflow: 'auto'}}>
              <h3 style={{ margin: "10px", fontWeight: 'bold', marginBottom: "30px" }}>Menu</h3>
              {list && list.map((item) => {
                  return item.count!== 0 && <div key={item.id} className='MenuItem' onClick={() => handleScroll(item.id)}>
                      <div>{item.name}</div>
                      <div style={{fontWeight: 'bold'}}>{item.count}</div>
                  </div>
              })}
          </div>
        </Modal.Body>
      </Modal>
      <div className="Header">
        <img className="Logo" alt="" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <div style={{marginLeft: '30px'}}>
          <div className="Title">Siya Foods</div>
          <div className="SubTitle">By Siya Developers</div>
        </div>
      </div>
      <div className="menu">
        <Navbar bg="light" variant="light" sticky="top" style={{marginBottom: '10px'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button size='small' onClick={() =>  handleChangeVeg()} sx={{ borderRadius: '10px', fontFamily: 'Sen',color: veg ? 'white':'#473d72', backgroundColor: veg ? '#473d72' : 'white' ,'&:hover': { backgroundColor: veg ? '#473d72' : 'white' },
                  '&:active': { backgroundColor: "#473d72" }, '&:focus': { backgroundColor: "#473d72" }, }} endIcon={veg && <CloseIcon />} variant="contained">
                    <img className="Logo" alt="" src="https://img.icons8.com/color/512/vegetarian-food-symbol.png" style={{ height: '20px', width: '20px' }} />
                </Button>
                <Button size='small' style={{marginLeft: '10px'}} onClick={() =>  handleChangeNonVeg()} sx={{ borderRadius: '10px', fontFamily: 'Sen',color: nonveg ? 'white':'#473d72', backgroundColor: nonveg ? '#473d72' : 'white' ,'&:hover': { backgroundColor: nonveg ? '#473d72' : 'white' },
                  '&:active': { backgroundColor: "#473d72" }, '&:focus': { backgroundColor: "#473d72" }, }} endIcon={nonveg && <CloseIcon />} variant="contained">
                    <img className="Logo" alt="" src="https://img.icons8.com/color/512/non-vegetarian-food-symbol.png" style={{ height: '20px', width: '20px' }} />
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button size='small' onClick={() => handleShow1()} sx={{ width: '100px', borderRadius: '10px', fontFamily: 'Sen', backgroundColor: "#473d72",'&:hover': { backgroundColor: "#473d72" },
                '&:active': { backgroundColor: "#473d72" }, '&:focus': { backgroundColor: "#473d72" }, }} startIcon={<RestaurantMenuIcon />} variant="contained">
                Menu
              </Button>
              <Link to='/search'>
                <IconButton size='small' style={{
                  backgroundColor: "#473d72",
                  marginLeft: '10px'
                }}>
                    <SearchIcon sx={{color: 'white'}} />
                </IconButton>
              </Link>
            </div>
            </div>
        </Navbar>
        {mains.length>0 && <div id="mains">
          <Mains category="Main Course" type="mains" meals={mains} />
        </div>}
        {sides.length>0 && <div id="sides">
          <Extras category="Sides" type="sides" items={sides} />
        </div>}
        {drinks.length>0 && <div id="drinks">
          <Extras category="Drinks" type="drinks" items={drinks} />
        </div>}
        {shakes.length>0 && <div id="shakes">
          <Extras category="Shakes" type="shakes" items={shakes} />
        </div>}
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
      
    </>
  )
}

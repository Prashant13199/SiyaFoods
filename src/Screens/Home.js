import React, { useState, useContext, useEffect } from 'react'
import Extras from '../Components/Extras';
import Mains from '../Components/Mains';
import data from '../data';
import Modal from 'react-bootstrap/Modal';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { IconButton, Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../Context';
import ListIcon from '@mui/icons-material/List';
import Header from '../Components/Header';

export default function Home() {

  const [veg, setVeg] = useState(false)
  const [nonveg, setNonVeg] = useState(false)
  const [bestseller, setBestseller] = useState(false)
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [mains, setMains] = useState([])
  const [sides, setSides] = useState([])
  const [drinks, setDrinks] = useState([])
  const [shakes, setShakes] = useState([])

  const [items] = useContext(Context);

  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"))

  const totalPrice = Object.keys(items).reduce((acc, curr) => {
    const [group, item] = curr.split("-");
    const amount = items[curr] * data[group][item].price;
    return acc + amount;
  }, 0);

  useEffect(() => {
    let arrayMains = []
    data.mains.map((meal, index) => {
      if (bestseller && !veg && !nonveg) {
        if (meal?.bestseller)
          arrayMains.push({ "meal": meal, "index": index })
      }
      if (!bestseller && veg && !nonveg) {
        if (meal?.type === 'veg')
          arrayMains.push({ "meal": meal, "index": index })
      }
      if (bestseller && veg && !nonveg) {
        if (meal?.type === 'veg' && meal?.bestseller) {
          arrayMains.push({ "meal": meal, "index": index })
        }
      }
      if (!bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg')
          arrayMains.push({ "meal": meal, "index": index })
      }
      if (bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg' && meal?.bestseller)
          arrayMains.push({ "meal": meal, "index": index })
      }
      if (!bestseller && !veg && !nonveg) {
        arrayMains.push({ "meal": meal, "index": index })
      }
    })
    setMains(arrayMains)

    let arraySides = []
    data.sides.map((meal, index) => {
      if (bestseller && !veg && !nonveg) {
        if (meal?.bestseller)
          arraySides.push({ "meal": meal, "index": index })
      }
      if (!bestseller && veg && !nonveg) {
        if (meal?.type === 'veg')
          arraySides.push({ "meal": meal, "index": index })
      }
      if (bestseller && veg && !nonveg) {
        if (meal?.type === 'veg' && meal?.bestseller) {
          arraySides.push({ "meal": meal, "index": index })
        }
      }
      if (!bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg')
          arraySides.push({ "meal": meal, "index": index })
      }
      if (bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg' && meal?.bestseller)
          arraySides.push({ "meal": meal, "index": index })
      }
      if (!bestseller && !veg && !nonveg) {
        arraySides.push({ "meal": meal, "index": index })
      }
    })
    setSides(arraySides)

    let arrayDrinks = []
    data.drinks.map((meal, index) => {
      if (bestseller && !veg && !nonveg) {
        if (meal?.bestseller)
          arrayDrinks.push({ "meal": meal, "index": index })
      }
      if (!bestseller && veg && !nonveg) {
        if (meal?.type === 'veg')
          arrayDrinks.push({ "meal": meal, "index": index })
      }
      if (bestseller && veg && !nonveg) {
        if (meal?.type === 'veg' && meal?.bestseller) {
          arrayDrinks.push({ "meal": meal, "index": index })
        }
      }
      if (!bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg')
          arrayDrinks.push({ "meal": meal, "index": index })
      }
      if (bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg' && meal?.bestseller)
          arrayDrinks.push({ "meal": meal, "index": index })
      }
      if (!bestseller && !veg && !nonveg) {
        arrayDrinks.push({ "meal": meal, "index": index })
      }
    })
    setDrinks(arrayDrinks)

    let arrayShakes = []
    data.shakes.map((meal, index) => {
      if (bestseller && !veg && !nonveg) {
        if (meal?.bestseller)
          arrayShakes.push({ "meal": meal, "index": index })
      }
      if (!bestseller && veg && !nonveg) {
        if (meal?.type === 'veg')
          arrayShakes.push({ "meal": meal, "index": index })
      }
      if (bestseller && veg && !nonveg) {
        if (meal?.type === 'veg' && meal?.bestseller) {
          arrayShakes.push({ "meal": meal, "index": index })
        }
      }
      if (!bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg')
          arrayShakes.push({ "meal": meal, "index": index })
      }
      if (bestseller && !veg && nonveg) {
        if (meal?.type === 'non-veg' && meal?.bestseller)
          arrayShakes.push({ "meal": meal, "index": index })
      }
      if (!bestseller && !veg && !nonveg) {
        arrayShakes.push({ "meal": meal, "index": index })
      }
    })
    setShakes(arrayShakes)

  }, [veg, nonveg, bestseller])

  const list = [
    { "name": "Main Course", "id": 'mains', "count": mains.length },
    { "name": "Sides", "id": 'sides', "count": sides.length },
    { "name": "Drinks", "id": 'drinks', "count": drinks.length },
    { "name": "Shakes", "id": 'shakes', "count": shakes.length },
  ]

  const handleChangeVeg = () => {
    setNonVeg(false)
    setVeg(!veg)
  }

  const handleChangeNonVeg = () => {
    setNonVeg(!nonveg)
    setVeg(false)
  }

  const handleChangeBestSeller = () => {
    setBestseller(!bestseller)
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
      <Modal size="md" show={show1} onHide={handleClose1} centered>
        <Modal.Body>
          <div style={{ maxHeight: '50vh', overflow: 'auto' }}>
            <h3 style={{ margin: "10px", fontWeight: 'bold', marginBottom: "30px" }}>Menu</h3>
            {list && list.map((item) => {
              return item.count !== 0 && <div key={item.id} className='MenuItem' onClick={() => handleScroll(item.id)}>
                <div>{item.name}</div>
                <div style={{ fontWeight: 'bold' }}>{item.count}</div>
              </div>
            })}
          </div>
        </Modal.Body>
      </Modal>
      <Header />
      <div className="menu">
        <Navbar bg="light" variant="light" sticky="top" style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button size='small' onClick={() => handleChangeVeg()} sx={{
                borderRadius: '10px', margin: '4px', textTransform: 'none', fontFamily: 'Sen', color: veg ? 'white' : '#473d72', backgroundColor: veg ? '#473d72' : 'white', '&:hover': { backgroundColor: veg ? '#473d72' : 'white' },
                '&:active': { backgroundColor: "#473d72" },
              }} variant="contained">
                Veg&nbsp;<img className="Logo" alt="" src="https://img.icons8.com/color/512/vegetarian-food-symbol.png" style={{ height: '20px', width: '20px' }} />
              </Button>
              <Button size='small' style={{ marginLeft: '10px', textTransform: 'none' }} onClick={() => handleChangeNonVeg()} sx={{
                borderRadius: '10px', margin: '4px', fontFamily: 'Sen', color: nonveg ? 'white' : '#473d72', backgroundColor: nonveg ? '#473d72' : 'white', '&:hover': { backgroundColor: nonveg ? '#473d72' : 'white' },
                '&:active': { backgroundColor: "#473d72" },
              }} variant="contained">
                Non-veg&nbsp;<img className="Logo" alt="" src="https://img.icons8.com/color/512/non-vegetarian-food-symbol.png" style={{ height: '20px', width: '20px' }} />
              </Button>
              <Button size='small' style={{ marginLeft: '10px', textTransform: 'none' }} onClick={() => handleChangeBestSeller()} sx={{
                borderRadius: '10px', margin: '4px', fontFamily: 'Sen', color: bestseller ? 'white' : '#473d72', backgroundColor: bestseller ? '#473d72' : 'white', '&:hover': { backgroundColor: bestseller ? '#473d72' : 'white' },
                '&:active': { backgroundColor: "#473d72" },
              }} variant="contained">
                Best Seller&nbsp;<img className="Logo" alt="" src="https://img.icons8.com/fluency/48/star--v1.png" style={{ height: '20px', width: '20px', marginBottom: '2px' }} />
              </Button>
            </div>
          </div >
        </Navbar >
        {
          mains.length > 0 && <div id="mains">
            <Mains category="Main Course" type="mains" meals={mains} />
          </div>
        }
        {
          sides.length > 0 && <div id="sides">
            <Extras category="Sides" type="sides" items={sides} />
          </div>
        }
        {
          drinks.length > 0 && <div id="drinks">
            <Extras category="Drinks" type="drinks" items={drinks} />
          </div>
        }
        {
          shakes.length > 0 && <div id="shakes">
            <Extras category="Shakes" type="shakes" items={shakes} />
          </div>
        }
        <Navbar variant="light" sticky="bottom" style={{ padding: 0 }} >
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'sticky', bottom: '50px', paddingBottom: '10px' }}>
              {lastOrder && <Link to="/previousOrder">
                <Tooltip placement='top' title="Previos Order">
                  <IconButton size='small' style={{
                    backgroundColor: "#473d72",
                    marginLeft: '10px'
                  }}>
                    <ListIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              </Link>}
              <Link onClick={() => handleShow1()}>
                <Tooltip placement='top' title="Menu">
                  <IconButton size='small' style={{
                    backgroundColor: "#473d72",
                    marginLeft: '10px'
                  }}>
                    <RestaurantMenuIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to='/search'>
                <Tooltip placement='top' title="Search">
                  <IconButton size='small' style={{
                    backgroundColor: "#473d72",
                    marginLeft: '10px'
                  }}>
                    <SearchIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            {totalPrice > 0 && <div className='total'>
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
              <Link to="/cart" style={{ textDecoration: 'none' }}>
                <Button sx={{
                  fontFamily: 'Sen', fontSize: '14px', borderRadius: '10px', height: '30px', color: 'white', backgroundColor: '#473d72', '&:hover': {
                    color: 'white',
                    backgroundColor: '#473d72',
                    borderColor: '#473d72',
                  },
                }} variant="contained">View cart</Button>
              </Link>
            </div>}
          </div>
        </Navbar >
      </div >
    </>
  )
}

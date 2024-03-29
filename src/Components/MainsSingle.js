import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { IconButton, Button } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import '../App.css'
import DeleteIcon from '@mui/icons-material/Delete';

export default function MainsSingle({ index, type, meal }) {

  const [value, setValue] = useState(0);
  const [items, updateItem] = useContext(Context);

  useEffect(() => {
    Object.keys(items).reduce((acc, curr) => {
      const [group, item] = curr.split("-");
      if (group.toString() === type && Number(item) === Number(index)) {
        setValue(items[curr])
      }
    }, 0);
  }, [items, type, index])

  return (
    <article key={index} id={meal.name} className="menu-item">
      <div>
        {meal?.bestseller && <div className="bestseller">BestSeller <img style={{ height: '16px', width: '16px', marginBottom: '2px' }} src="https://img.icons8.com/fluency/48/star--v1.png" /></div>}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          {meal?.type && <img alt="" src={meal.type === "veg" ? "https://img.icons8.com/color/512/vegetarian-food-symbol.png" : "https://img.icons8.com/color/512/non-vegetarian-food-symbol.png"} style={{ height: "20px", width: "20px" }} />}
          <h3 className="mains-name">{meal.name}</h3>
        </div>
        <strong className="mains-price">&#8377;{meal.price}</strong>
        <p className="mains-description">{meal.description}</p>
      </div>
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
        <img className="menu-item-photo" alt="" src="https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <div style={{ position: 'relative', bottom: '20px' }}>
          {value === 0 ?
            <Button sx={{
              fontFamily: 'Sen', backgroundColor: 'white', fontSize: '14px', borderRadius: '10px', height: '40px', color: '#473d72', borderColor: '#473d72', '&:hover': {
                color: '#473d72',
                borderColor: '#473d72',
                backgroundColor: 'white',
              },
            }} className='AddButton' onClick={() => { updateItem(type, index, value + 1) }} variant="outlined">Add</Button>
            :
            <div className='IncDecButton'><IconButton onClick={() => {
              if (value > 0) {
                updateItem(type, index, value - 1)
              }
            }}>
              {value === 1 ? <DeleteIcon sx={{ fontSize: '14px' }} className="icon" /> : <RemoveCircleOutlineRoundedIcon sx={{ fontSize: '14px' }} className="icon" />}
            </IconButton>
              <strong style={{ fontFamily: "Sen" }}>{value}</strong>
              <IconButton onClick={() => {
                updateItem(type, index, value + 1)
              }}>
                <AddCircleOutlineRoundedIcon sx={{ fontSize: '14px' }} className="icon" />
              </IconButton>
            </div>
          }
        </div>
      </div>
    </article>
  )
}

import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { IconButton, Button } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExtraSingle({ item, index, type }) {
  const [value, setValue] = useState(0);
  const [items1, updateItem] = useContext(Context);

  useEffect(() => {
    Object.keys(items1).reduce((acc, curr) => {
      const [group, item] = curr.split("-");
      if (group.toString() === type && Number(item) === Number(index)) {
        setValue(items1[curr])
      }
    }, 0);
  }, [items1, index, type])

  return (
    <article className="menu-item-sides" key={index} id={item.name}>
      <div>
        {item?.bestseller && <div className="bestseller">BestSeller <img style={{ height: '16px', width: '16px', marginBottom: '2px' }} src="https://img.icons8.com/fluency/48/star--v1.png" /></div>}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          {item.type && <img alt="" src={item.type === "veg" ? "https://img.icons8.com/color/512/vegetarian-food-symbol.png" : "https://img.icons8.com/color/512/non-vegetarian-food-symbol.png"} style={{ height: "20px", width: "20px" }} />}
          <div className="extras-name">{item.name}</div>
        </div>
        <strong className="extras-price">&#8377;{item.price}</strong>
      </div>
      <div>
        {value === 0 ?
          <Button sx={{
            fontFamily: 'Sen', fontSize: '14px', borderRadius: '10px', height: '40px', color: '#473d72', borderColor: '#473d72', '&:hover': {
              color: '#473d72',
              borderColor: '#473d72',
            },
          }} className='AddButton' onClick={() => {
            updateItem(type, index, value + 1)
          }} variant="outlined">Add</Button>
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
            </IconButton></div>
        }
      </div>
    </article>
  )
}

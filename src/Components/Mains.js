import React, { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainsSingle from "./MainsSingle";

export default function Mains({ type, meals, category }) {

  const [open, setOpen] = useState(true);

  return (
    <section className="mains" id={type}>
      <button style={{display: 'none'}} onClick={() => setOpen(true)}></button>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="extras-heading" aria-controls="example-collapse-text" aria-expanded={open}>{category}</h2>
      <div>{open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }</div>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          {meals.map((meal) => {
            return <MainsSingle meal={meal.meal} index={meal.index} type={type} key={meal.index} />
          })}
        </div>
      </Collapse>
    </section>
  );
}

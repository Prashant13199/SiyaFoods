import React, { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExtraSingle from "./ExtraSingle";

export default function Extras({ type, items, category }) {

  const [open, setOpen] = useState(true);

  return (
    <section className="extras">
      <button style={{ display: 'none' }} onClick={() => setOpen(true)}></button>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <h2 className="extras-heading" aria-controls="example-collapse-text" aria-expanded={open}>{category}</h2>
        <div>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          {items.map((item) => {
            return <ExtraSingle item={item.meal} index={item.index} type={type} key={item.index} />
          })}
        </div>
      </Collapse>
    </section>
  );
}

import React, { useState } from "react";
import './index.css';
const context = require.context('./images', true, /.png/);

const Dongxiao = () => {
  const arr = new Array(11).fill(0);
  const [active, setActive] = useState(0)
  return (
    <div className="dongxiao">
      <ul className="container">
        {arr.map((a, idx) => {
          return (
            <li className={`item ${active === idx ? 'active': ''}`}>
              <img className="bg-img" src={context(`./avatars_${idx+1}.png`)} alt="" /> 
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Dongxiao;
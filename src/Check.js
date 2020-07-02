import React from 'react'
import './App.css'

export const Check = props => {
  return (
    <li>
      <input
        key={props.id}
        onClick={props.handleFavorite}
        type="checkbox"
        checked={props.isChecked}
        value={props.value} /> {props.name}
    </li>
  )
}

export default Check
import React from 'react'

export default function MarkComponent(props) {
  const { onClick, coordinates, name, note, title } = props
  return (
    <li onClick={() => onClick(coordinates, name, note, title)}>
      <div className='mark-title-wrapper'>
        <p>{title}</p>
      </div>
      <div className='mark-note-wrapper'>
        <p>{note}</p>
      </div>
    </li>
  )
}

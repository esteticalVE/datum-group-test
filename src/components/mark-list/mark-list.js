import React from 'react'
import MarkComponent from './mark'

export default function MarkListComponent(props) {
  const { items, onClick } = props
  return (
    <ul>
      {items.map(({ name, note, title, coordinates }) => {
        return (
          <MarkComponent
            key={name + Math.random() / 60}
            onClick={onClick}
            name={name}
            note={note}
            title={title}
            coordinates={coordinates}
          />
        )
      })}
    </ul>
  )
}

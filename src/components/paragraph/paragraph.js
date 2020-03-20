import React from 'react'

export default function ParagraphComponent(props) {
  const { children } = props
  return <p className='paragraph my-4'>{children}</p>
}

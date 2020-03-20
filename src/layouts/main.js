import React from 'react'

export default function MainLayout(props) {
  const { children } = props
  return <div className='layout-wrapper'>{children}</div>
}

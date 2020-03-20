import React from 'react'
import MapComponent from '../components/map'
import { createStringXY } from 'ol/coordinate'
import MousePosition from 'ol/control/MousePosition'

const MOUSE_POSITION = 'mouse-position'

export default function MapPage() {
  const mousePositionInstance = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById(MOUSE_POSITION),
    undefinedHTML: '&nbsp;',
  })

  function renderElementMousePosition() {
    return <div id={MOUSE_POSITION} />
  }

  return (
    <>
      <MapComponent
        mousePositionController={mousePositionInstance}
        renderElementMousePosition={renderElementMousePosition}
      />
    </>
  )
}

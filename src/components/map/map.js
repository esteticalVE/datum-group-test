import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'ol/ol.css'
import { Overlay } from 'ol'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import { Tile } from 'ol/layer'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import TileLayer from 'ol/layer/Tile'
import LayerGroup from 'ol/layer/Group'

import MarkList from '../mark-list'
import { markers } from '../../constants/markers'
import {
  mappingMarkers,
  getDrawType,
  formatArea,
  formatLengths,
} from '../../utils'
import { LineString, Polygon } from 'ol/geom'

export default function MapComponent(props) {
  const { mousePositionController, renderElementMousePosition } = props
  const [mapCenter] = useState([39.710599, 47.237962])
  const [mapZoom] = useState(17)
  const [drawInstanceLine] = useState(getDrawType('LineString'))
  const [drawInstancePolygon] = useState(getDrawType('Polygon'))

  const mapInstance = new Map({
    controls: defaultControls().extend([mousePositionController]),
    layers: [
      new Tile({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [],
      zoom: 0,
    }),
  })

  const vectorSource = new VectorSource({
    features: mappingMarkers(markers),
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  })

  const rasterLayer = new TileLayer({
    source: new OSM(),
  })

  useEffect(() => {
    const element = document.getElementById('popup')
    const popup = new Overlay({
      element: element,
      stopEvent: false,
      offset: [-50, -10],
    })
    mapInstance.addOverlay(popup)

    mapInstance.on('click', function(evt) {
      const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, function(
        feature
      ) {
        return feature
      })
      if (feature && feature.get('title')) {
        const coordinates = feature.getGeometry()
        popup.setPosition(coordinates.flatCoordinates)
        element.innerHTML = `<div class="popup-content"> ${feature.get(
          'title'
        )} </div>`
      } else {
        const deletingNode = document.getElementsByClassName('popup-content')

        for (let i = deletingNode.length - 1; i >= 0; --i) {
          deletingNode[i].remove()
        }
        if (feature) {
          const coordinates = feature.getGeometry()
          popup.setPosition(coordinates.flatCoordinates)
        }
      }
    })
  }, [mapInstance])

  useEffect(() => {
    mapInstance.setTarget('map')
    mapInstance.setLayerGroup(
      new LayerGroup({
        layers: [rasterLayer, vectorLayer],
      })
    )
    mapInstance.setView(
      new View({
        center: fromLonLat(mapCenter),
        zoom: mapZoom,
      })
    )
  }, [mapCenter, mapInstance, mapZoom, rasterLayer, vectorLayer])

  function getMark(coordinates, name, note, title) {
    mapInstance.getView().setCenter(fromLonLat(coordinates))
    mapInstance.getView().setZoom(mapZoom)

    const element = document.createElement('div')
    element.className = 'popup-content'
    const elementToolTip = new Overlay({
      element: element,
      offset: [-50, -10],
      positioning: 'bottom-center',
    })
    mapInstance.addOverlay(elementToolTip)
    const isOnElement = document.getElementsByClassName('popup-content')
    if (isOnElement.length <= 1) {
      element.innerHtml = `<div class="popup-content"></div>`
      element.innerText = title
      elementToolTip.setPosition(fromLonLat(coordinates))
    } else {
      const deletingNodes = document.getElementsByClassName('popup-content')
      for (let i = deletingNodes.length - 1; i >= 0; --i) {
        deletingNodes[i].remove()
      }
    }
  }

  function drawStart(evt) {
    const sketch = evt.feature
    sketch.getGeometry().on('change', function(evt) {
      const geom = evt.target
      let output
      if (geom instanceof Polygon) {
        output = formatArea(geom)
        localStorage.setItem('output', output)
      } else if (geom instanceof LineString) {
        const formatLength = geom => formatLengths(geom)
        output = formatLength(geom)
        localStorage.setItem('output', output)
      }
    })
  }

  function drawEnd() {
    const element = document.getElementById('popup')
    element.innerHTML = `<div class="popup-content"> ${localStorage.getItem(
      'output'
    )} </div>`
  }

  function handleDraw(isLength) {
    if (isLength) {
      removeDraw()
      mapInstance.addInteraction(drawInstanceLine)
      drawInstanceLine.on('drawstart', drawStart)
      drawInstanceLine.on('drawend', drawEnd)
    } else {
      removeDraw()
      mapInstance.addInteraction(drawInstancePolygon)
      drawInstancePolygon.on('drawstart', drawStart)
      drawInstancePolygon.on('drawend', drawEnd)
    }
  }
  function removeDraw() {
    mapInstance.removeInteraction(drawInstanceLine)
    mapInstance.removeInteraction(drawInstancePolygon)
    localStorage.removeItem('output')
  }

  return (
    <div id='map' className='map'>
      <div id='popup' className='ol-popup' />
      <MarkList items={markers} onClick={getMark} />
      {renderElementMousePosition()}
      <button
        className='map-button-draw-l btn btn-success'
        onClick={() => handleDraw(true)}
      >
        Измерить расстояние
      </button>
      <button
        className='map-button-draw-s btn btn-success'
        onClick={() => handleDraw(false)}
      >
        Измерить площадь
      </button>
      <button
        className='map-button-cancel-l btn btn-warning'
        onClick={removeDraw}
      >
        Отменить
      </button>

      <Link to='/'>
        <button className='map-button-home btn btn-primary'>Домой </button>
      </Link>
    </div>
  )
}

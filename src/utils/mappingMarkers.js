import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Icon, Style } from 'ol/style'

export default function featuresMarkers(arr) {
  return arr.map(item => {
    const { title, name, note, coordinates, icon } = item
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      title,
      name,
      note,
    })
    iconFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          scale: 0.8,
          src: icon,
        }),
      })
    )
    return iconFeature
  })
}

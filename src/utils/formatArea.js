import { getArea } from 'ol/sphere'

export default function formatArea(polygon) {
  const area = getArea(polygon)
  let output
  if (area > 10000) {
    output = `${Math.round((area / 1000000) * 100) / 100} km²`
  } else {
    output = `${Math.round(area * 100) / 100} m²`
  }
  return output
}

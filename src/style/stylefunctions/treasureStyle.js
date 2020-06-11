import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';

export default function treasureStyle() {
  return function style(feature) {
    const geometry = feature.getGeometry();
    const styles = [
      new Style({
        stroke: new Stroke({
          color: "rgba(255,0,0,1.0)",
          lineDash: [
            6,
            6
          ],
          width: 4
        })
      })
    ];
    const coords = geometry.getCoordinates();
    let coord;
    coords.forEach(function (i, idx, array) {
      if (idx === array.length - 1) {
        coord = i;
      }
    });
    styles.push(new Style({
      geometry: new Point(coord),
      image: new Icon({
        src: 'img/png/x.png',
        rotateWithView: true
      })
    }));
    return styles;
  }
}

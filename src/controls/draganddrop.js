import olDragAndDrop from 'ol/interaction/DragAndDrop';
import GPXFormat from 'ol/format/GPX';
import GeoJSONFormat from 'ol/format/GeoJSON';
import IGCFormat from 'ol/format/IGC';
import KMLFormat from 'ol/format/KML';
import TopoJSONFormat from 'ol/format/TopoJSON';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Component } from '../ui';

const DragAndDrop = function DragAndDrop(options = {}) {
  let viewer;


  var styleFunction = function (feature) {
    var geometry = feature.getGeometry();
    var styles = [
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

    var coords = geometry.getCoordinates();
    let coor;
    coords.forEach(function (i, idx, array) {
      if (idx === array.length - 1) {
        coor = i;
      }
    });
    styles.push(new Style({
      geometry: new Point(coor),
      image: new Icon({
        src: 'img/png/x.png',
        rotateWithView: true
      })
    }));
    return styles;
  };

  return Component({
    name: 'draganddrop',
    onAdd(evt) {
      viewer = evt.target;
      const map = viewer.getMap();
      const groupName = options.groupName || 'egna-lager';
      const groupTitle = options.groupTitle || 'Egna lager';
      let vectorSource;
      let vectorLayer;

      const dragAndDrop = new olDragAndDrop({
        formatConstructors: [
          GPXFormat,
          GeoJSONFormat,
          IGCFormat,
          KMLFormat,
          TopoJSONFormat
        ]
      });

      map.addInteraction(dragAndDrop);

      dragAndDrop.on('addfeatures', (event) => {
        vectorSource = new VectorSource({
          features: event.features
        });
        if (!viewer.getGroup(groupName)) {
          viewer.addGroup({ title: groupTitle, name: groupName, expanded: true });
        }
        vectorLayer = new VectorLayer({
          source: vectorSource,
          name: event.file.name.split('.')[0].replace(/\W/g, ''),
          group: groupName,
          title: event.file.name.split('.')[0],
          queryable: true,
          removable: true,
          style: styleFunction
        });
        map.addLayer(vectorLayer);
        map.getView().fit(vectorSource.getExtent());
      });
      this.render();
    },
    onInit() {
    },
    render() {
      this.dispatch('render');
    }
  });
};

export default DragAndDrop;

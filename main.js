import './style.css';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import {Icon, Style} from 'ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
//import TileJSON from 'ol/source/TileJSON';


/* const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
}); */
 
//Crear marcadores
const marcador = new Feature({
  geometry: new Point(fromLonLat([-78.4866264, -0.1535451])),// En dónde se va a ubicar
  name: 'Quito',
  additionalInfo:'Capital de Ecuador'
});
const marcador2 = new Feature({
  geometry: new Point(fromLonLat([116.390903, 39.904835])),// En dónde se va a ubicar
  name:'Beijing',
  additionalInfo:'Capital de China'

});
//console.log(marcador)

// Agregamos icono
marcador.setStyle(
  new Style({
    image: new Icon({
        src: "./location.png",
        scale: 0.1,
    })
  })
);
marcador2.setStyle(
  new Style({
    image: new Icon({
        color: '#BADA55',
        crossOrigin: 'anonymous',
        src: "./location.png",
        scale: 0.1,
    })
  })
);

// marcadores debe ser un arreglo
// Agregamos el marcador al arreglo
const vectorSource = new VectorSource({
  features: [marcador, marcador2], // A la capa le ponemos los marcadores
});

// Layer marcadores
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// Layer mapa
const rasterLayer = new TileLayer({
    //source: new OSM() // idioma oficial de cada pais
    /* source: new TileJSON({
      url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
      crossOrigin: '',
    }) */
    source: new XYZ({
      url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
    })
      
});

//Crear mapa
const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    //center: fromLonLat([0,0]),
    center: fromLonLat([116.390903, 39.904835]),
    //zoom:3,
    zoom: 12,
  }),
});

//Overlay usado para desplear en popup con info adicional del marcador

//Obtener info del marcador (feature)
map.on('click', function(e){
  //for each feature at pixel nos da el dato de cada marcador declarado
  map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
    //console.log(feature) //click sobre marcador
    //console.log(feature.getKeys()) //obtener data disponible del feature
    let clickedFeatureCoordinate = e.coordinate;
    console.log(clickedFeatureCoordinate)
    //let clickedFeatureGeometry = feature.get('geometry');
    //console.log(clickedFeatureGeometry.flatCoordinates)
    let clickedFeatureName = feature.get('name');
    let clickedFeatureAdditionalInfo = feature.get('additionalInfo');
    console.log(clickedFeatureName, clickedFeatureAdditionalInfo)
  })
})


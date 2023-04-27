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
import Overlay from 'ol/Overlay.js';
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
//--------------mapa was here
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

//Overlay usado para desplegar popup con info del marcador

/* const popup = new Overlay({
  element: document.getElementById('popup'),
});
popup.setPosition([116.390903, 39.904835]);
//popup.setPosition(coordinate);
map.addOverlay(popup); */ 

const overlayContainerElement = document.getElementById('overlay-container')

const overlayLayer = new Overlay({
  element:overlayContainerElement,
  //element: document.getElementById('overlay-container')
  //necesitamos ubicar la posicion, pero esta va a hacerse sobre cada punto que se haga click
})

//Obtener info del marcador (feature)
map.on('click', function(e){
  //for each feature at pixel nos da el dato de cada marcador declarado
  map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
    //console.log(feature)
    //console.log(feature.getKeys()) //obtener data disponible del feature  //click sobre marcador
    
    //Obtenemos la coordenada del marcador clickeado
    let clickedCoordinate = e.coordinate;
    console.log(clickedCoordinate)
    //let clickedFeatureGeometry = feature.get('geometry');
    //console.log(clickedFeatureGeometry.flatCoordinates)

    //Obtenemos datos del marcador(Feature) 
    const clickedFeatureName = feature.get('name');
    const clickedFeatureAdditionalInfo = feature.get('additionalInfo');
    console.log(clickedFeatureName, clickedFeatureAdditionalInfo)
    
    //Especificamos la posicion
    overlayLayer.setPosition(clickedCoordinate);
    //Datos que va a mostrar
    const overlayFeatureName = document.getElementById('feature-name')
    const overlayFeatureInfo = document.getElementById('feature-additional-info')
    overlayFeatureName.innerHTML = clickedFeatureName;
    overlayFeatureInfo.innerHTML = clickedFeatureAdditionalInfo
   
  })
})
map.addOverlay(overlayLayer);

import React, { Fragment, useState } from "react";
// import ReactDOM from "react-dom";
import DrawTools from "./components/DrawTools";

// import { GlobalStateProvider, useGlobalState } from "./services/Store";
import { MapContainer, TileLayer } from "react-leaflet";
import Test from "./Test1";

// import { EditControl } from "react-leaflet-draw";
// import "./styles.css";
// import "react-leaflet-fullscreen/dist/styles.css";
import FullscreenControl from "react-leaflet-fullscreen";

const App = () => {
  const [geoData, setGeoData]= useState({type: "FeatureCollection",
features: []})
  const mapConfig = {
    lat: 22,
    lng: -72,
    zoom: 6
  };
  const handleGeojson = ()=> {
    setGeoData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.48043537139893, 37.82564992009924],
                [-122.48129367828368, 37.82629397920697],
                [-122.48240947723389, 37.82544653184479],
                [-122.48373985290527, 37.82632787689904],
                [-122.48425483703613, 37.82680244295304],
                [-122.48605728149415, 37.82639567223645],
                [-122.4898338317871, 37.82663295542695],
                [-122.4930953979492, 37.82415839321614],
                [-122.49700069427489, 37.821887146654376],
                [-122.4991464614868, 37.82171764783966],
                [-122.49850273132326, 37.81798857543524],
                [-122.50923156738281, 37.82090404811055],
                [-122.51232147216798, 37.823344820392535],
                [-122.50150680541992, 37.8271414168374],
                [-122.48743057250977, 37.83093781796035],
                [-122.48313903808594, 37.82822612280363],
                [-122.48043537139893, 37.82564992009924]
              ]
            ]
          }
        }
      ]
    })
  }

  return (
    <Fragment>
      {/* <GlobalStateProvider> */}
      <div id="map-wrapper">
      <button onClick={handleGeojson}>Add GeoJson</button>
        <MapContainer center={[mapConfig.lat, mapConfig.lng]} zoom={mapConfig.zoom}>
          <FullscreenControl position="topleft" />
          {/* <DrawTools /> */}
          <Test setGeoData={setGeoData} geoData={geoData}/>
          <TileLayer
            attribution="Tiles &copy; Carto"
            // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      {/* </GlobalStateProvider> */}
    </Fragment>
  );
};

export default App;

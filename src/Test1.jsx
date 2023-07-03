import React, { useState } from "react";
import { Map, TileLayer, Circle, FeatureGroup } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

//

// let polyline;

const Test =(props)=> {
  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  let _editableFG = null;

  function getGeoJson() {
    return {
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
    };
  }
  const _onFeatureGroupReady = reactFGref => {
    // populate the leaflet FeatureGroup with the geoJson layers

    let leafletGeoJSON = new L.GeoJSON(getGeoJson());
    // let leafletGeoJSON = new L.GeoJSON(props.geoData);
    let leafletFG = reactFGref.leafletElement;

    leafletGeoJSON.eachLayer(layer => {
      leafletFG.addLayer(layer);
    });

    // store the ref for future access to content

    _editableFG = reactFGref;
  };

  const _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = props;

    if (!_editableFG || !onChange) {
      return;
    }

    const geojsonData = _editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };
  const _onEdited = e => {
    let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    _onChange();
  };

  const _onCreated = e => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };

  const _onDeleted = e => {
    let numDeleted = 0;
    e.layers.eachLayer(layer => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange();
  };

  const _onMounted = drawControl => {
    console.log("_onMounted", drawControl);
  };

  const _onEditStart = e => {
    console.log("_onEditStart", e);
  };

  const _onEditStop = e => {
    console.log("_onEditStop", e);
  };

  const _onDeleteStart = e => {
    console.log("_onDeleteStart", e);
  };

  const _onDeleteStop = e => {
    console.log("_onDeleteStop", e);
  };

  // const handleGeojson = ()=> {
  //   props.setGeoData({
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         type: "Feature",
  //         properties: {},
  //         geometry: {
  //           type: "Polygon",
  //           coordinates: [
  //             [
  //               [-122.48043537139893, 37.82564992009924],
  //               [-122.48129367828368, 37.82629397920697],
  //               [-122.48240947723389, 37.82544653184479],
  //               [-122.48373985290527, 37.82632787689904],
  //               [-122.48425483703613, 37.82680244295304],
  //               [-122.48605728149415, 37.82639567223645],
  //               [-122.4898338317871, 37.82663295542695],
  //               [-122.4930953979492, 37.82415839321614],
  //               [-122.49700069427489, 37.821887146654376],
  //               [-122.4991464614868, 37.82171764783966],
  //               [-122.49850273132326, 37.81798857543524],
  //               [-122.50923156738281, 37.82090404811055],
  //               [-122.51232147216798, 37.823344820392535],
  //               [-122.50150680541992, 37.8271414168374],
  //               [-122.48743057250977, 37.83093781796035],
  //               [-122.48313903808594, 37.82822612280363],
  //               [-122.48043537139893, 37.82564992009924]
  //             ]
  //           ]
  //         }
  //       }
  //     ]
  //   })
  // }
    return (
      <div>
        {/* <button onClick={handleGeojson}>Add GeoJson</button> */}
      <Map center={[37.8189, -122.4786]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        
        <FeatureGroup
          ref={reactFGref => {
            _onFeatureGroupReady(reactFGref);
          }}
        >
          <EditControl
            position="topright"
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
            onMounted={_onMounted}
            onEditStart={_onEditStart}
            onEditStop={_onEditStop}
            onDeleteStart={_onDeleteStart}
            onDeleteStop={_onDeleteStop}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
      </Map>
      </div>
    );
}
export default Test;


// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176


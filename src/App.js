/* import logo from './logo.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './App.css'; */

/* function App() {
  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
 */

import { React, useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import covidData from './data.json'

function App() {
  const [activeCovid, setActiveCovid] = useState(null);
  /* const covidIcon = new Icon({
    iconUrl: icon1,
    iconSize: [25, 25]
  }) */
  return (
    <MapContainer center={[20.593683, 78.962883]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />
      {covidData.map(eachData => (
        <Marker
          key={eachData.Id}
          position={[eachData.Latitude, eachData.Longitude]}
          eventHandlers={{
            click: () => {
              setActiveCovid(eachData)
            }
          }}
        />
      ))}
      {activeCovid && (
        <Popup
          position={[activeCovid.Latitude, activeCovid.Longitude]}
          onClose={() => {
            setActiveCovid(null)
          }}
        >
          <div>
            <h1>{activeCovid.Location}</h1>
            <p>Total cases:  {activeCovid.Total_Cases}</p>
            <p>New cases (1 day*):  {activeCovid.New_Cases_Per_Day}</p>
            <p>Cases per 1 million people:  {activeCovid.Cases_Per_1_Million_People}</p>
            <p>Deaths:  {activeCovid.Deaths}</p>
          </div>
        </Popup>
      )}
    </MapContainer>
  )
}
export default App;

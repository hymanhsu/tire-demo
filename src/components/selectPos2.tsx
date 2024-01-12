"use client";

import GoogleMapReact from 'google-map-react';
import { CSSProperties, useRef } from "react";


const LocationPin = ({ text, lat, lng }:{text:string,lat:number,lng:number}) => (
  <div >
    <p >{text},{lat},{lng}</p>
  </div>
)
// 
export default function SelectPos2({setPosition}:{setPosition:(x:number,y:number)=>{}}) {
  const defaultProps = {
    center: {
      lat: 49.25443290721618,
      lng: -123.21524388265985
    },
    zoom: 11
  };

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  const onClick = (e: google.maps.MapMouseEvent) => {
    // console.log("onClick args: ", e.latLng?.lat(), " : ", e.latLng?.lng());
    setPosition(e.latLng?.lat() as number, e.latLng?.lng() as number);
  };

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY as string }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
}

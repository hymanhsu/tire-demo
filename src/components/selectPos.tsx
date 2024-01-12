"use client";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
  Libraries,
  TrafficLayer ,
  InfoWindow
} from "@react-google-maps/api";
import { CSSProperties, useRef } from "react";

const libraries : Libraries = ["drawing", 'places'];
const mapContainerStyle = {
  width: "80vw",
  height: "50vh",
};
const inputStyle: CSSProperties = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `300px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "absolute",
  top: "10px",
  right: "10px",
};
const center = {
  lat: 49.25443290721618, // default latitude
  lng: -123.21524388265985, // default longitude
};

// 
export default function SelectPos({setPosition}:{setPosition:(x:number,y:number)=>{}}) {
  const myRef = useRef<StandaloneSearchBox|null|undefined>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: atob(process.env.NEXT_PUBLIC_API_KEY as string),
    libraries,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // console.log("onClick args: ", e.latLng?.lat(), " : ", e.latLng?.lng());
    setPosition(e.latLng?.lat() as number, e.latLng?.lng() as number);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <StandaloneSearchBox 
          onPlacesChanged={()=>{
          console.log("onPlacesChanged!!!!");

        }}>
          <input
            type="text"
            placeholder="Search Google Maps"
            style={inputStyle}
          />
          
        </StandaloneSearchBox>
        
        
        <Marker position={center} draggable={true} onClick={onClick} />

        {/* <InfoWindow position={center} >
          <div>hi</div>
        </InfoWindow> */}

        <TrafficLayer/>

      </GoogleMap>
    </div>
  );
}

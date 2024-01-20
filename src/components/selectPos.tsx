"use client";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
  Libraries,
  TrafficLayer,
  InfoWindow,
} from "@react-google-maps/api";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
  OutputFormat,
} from "react-geocode";
import { CSSProperties, useState } from "react";
// import { GoogleMapsEmbed } from "@next/third-parties/google";
{
  /* <GoogleMapsEmbed
apiKey={atob(process.env.NEXT_PUBLIC_API_KEY as string)}
height={200}
width="100%"
mode="place"
q="3939 W 16th Ave, Vancouver, BC V6R 2C9, Canada"
/> */
}

const libraries: Libraries = ["drawing", "places"];
const mapContainerStyle = {
  width: "80vw",
  height: "50vh",
};
const inputStyle: CSSProperties = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `400px`,
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
const ubc_pos = {
  lat: 49.26089837166032, 
  lng: -123.24601947735974,
};
const ubc_address = "Vancouver, BC V6T 1Z4";

//
export default function SelectPos({
  setPosition,
}: {
  setPosition: (addr: string, x: number, y: number) => {};
}) {
  const [pos, setPos] = useState(ubc_pos);
  const [pla, setPla] = useState(ubc_address);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: atob(process.env.NEXT_PUBLIC_API_KEY as string),
    libraries,
  });

  setDefaults({
    key: atob(process.env.NEXT_PUBLIC_API_KEY as string),
    language: "en",
    region: "es",
    outputFormat: OutputFormat.JSON,
  });


  const updatePlace = (address: string, updateCasade: boolean) => {
    console.log("update place: ", address);
    setPla(address);
    if (updateCasade) {
      geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          setPosition(address, lat, lng);
          updatePosition(lat, lng, false);
        })
        .catch(console.error);
    }
  };

  const updatePosition = (lat: number, lng: number, updateCasade: boolean) => {
    console.log("update position: ", lat, lng);
    setPos({
      lat: lat,
      lng: lng,
    });
    if (updateCasade) {
      geocode(RequestType.LATLNG, lat + "," + lng)
        .then(({ results }) => {
          const address = results[0].formatted_address;
          setPosition(address, lat, lng);
          updatePlace(address, false);
        })
        .catch(console.error);
    }
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
        zoom={12}
        center={pos}
      >
        <StandaloneSearchBox
          onPlacesChanged={() => {
            // console.log("onPlacesChanged!!!!");
          }}
        >
          <input
            type="text"
            placeholder="Search Google Maps"
            style={inputStyle}
            value={pla}
            onChange={(e) => {
              e.preventDefault();
              setPla(e.target.value);
            }}
            onBlur={(e) => {
              e.preventDefault();
              const newPlace = e.target.value;
              if (newPlace == "") {
                return;
              }
              console.log("new place = " + newPlace);
              updatePlace(newPlace, true);
            }}
          />
        </StandaloneSearchBox>

        <Marker
          position={pos}
          draggable={true}
          onClick={(e: google.maps.MapMouseEvent) => {            
            const lat = e.latLng?.lat() as number;
            const lng = e.latLng?.lng() as number;
            console.log(`new position : lat = ${lat}, lng = ${lng}`);
            updatePosition(lat, lng, true);
          }}
        />

        {/* <InfoWindow position={center} >
          <div>hi</div>
        </InfoWindow> */}

        <TrafficLayer />
      </GoogleMap>
    </div>
  );
}

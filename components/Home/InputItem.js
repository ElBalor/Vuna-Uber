"use client";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    type === "source"
      ? setPlaceholder("Pickup Location")
      : setPlaceholder("Dropoff Location");
  }, []);

  const getLatAndLong = (place, type) => {
    // Added null checks for place and its properties
    if (!place || !place.value || !place.value.place_id) {
      console.error("Invalid place object:", place);
      return;
    }

    const placeId = place.value.place_id;
    const services = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    services.getDetails({ placeId }, (placeDetails, status) => {
      // Added null checks for placeDetails and its properties
      if (
        status === "OK" &&
        placeDetails &&
        placeDetails.geometry &&
        placeDetails.geometry.location
      ) {
        console.log(placeDetails.geometry.location.lat());

        if (type === "source") {
          setSource({
            lat: placeDetails.geometry.location.lat(),
            lng: placeDetails.geometry.location.lng(),
            name: placeDetails.formatted_address,
            label: placeDetails.name,
          });
        } else {
          setDestination({
            lat: placeDetails.geometry.location.lat(),
            lng: placeDetails.geometry.location.lng(),
            name: placeDetails.formatted_address,
            label: placeDetails.name,
          });
        }
      }
    });
  };

  return (
    <div className="bg-slate-300 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image
        src={type === "source" ? "" : ""}
        width={15}
        height={15}
        alt="Source"
      />
      {/* <input
        type="text"
        placeholder={type === "source" ? "Pickup Location" : ""}
        className="bg-transparent w-full outline-none"
      /> */}
      <GooglePlacesAutocomplete
        // apiKey="AIzaSyD3csSqB0uhyNWQXL1cyKx8YsM9MPD4FqY"
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLong(place, type);
            setValue(place);
            console.log(place, type);
          },
          placeholder: [placeholder],
          isClearable: true,
          className: "w-full",

          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;

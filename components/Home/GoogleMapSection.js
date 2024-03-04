import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
function GoogleMapSection() {
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  // const center = {
  //   lat: -3.745,
  //   lng: -38.523,
  // };
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyD3csSqB0uhyNWQXL1cyKx8YsM9MPD4FqY",
  // });

  const { source, setSource } = useContext(SourceContext);
  const [type, setType] = useState("");
  const { destination, setDestination } = useContext(DestinationContext);
  const [map, setMap] = React.useState(null);
  const [directionRoutePoints, setDestinationRoutePoints] = useState([]);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  useEffect(() => {
    if (source?.length != 0 && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if (source.length !== [] && destination.length != []) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != 0 && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if (source.length !== [] && destination.length != []) {
      directionRoute();
    }
  }, [destination]);

  useEffect(() => {
    if (source) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source, destination]);

  if (type == "source") {
    setSource({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      name: place.formatted_address,
      label: place.name,
    });
  }

  const directionRoute = () => {
    const DirectionService = new google.maps.DirectionsService();
    console.log("DIE");

    DirectionService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TrafficModel.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionStatus.OK) {
          setDestinationRoutePoints(result);
        } else {
          console.error("Error");
        }
      }
    );
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => setMap(map)}
      onUnmount={onUnmount}
      options={{ mapId: "6ce34f771c3890fby" }}
    >
      {source.length != [] ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          // icon={{
          //   url: "https://thenounproject.com/api/private/icons/94600…00&foregroundOpacity=1&imageFormat=png&rotation=0",
          //   scaledSize: {
          //     width: 20,
          //     height: 20,
          //   },
          // }}
        >
          {" "}
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2">
              <p className="text-black font-bold text-xl">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {destination.length != [] ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          // icon={{
          //   url: "https://thenounproject.com/api/private/icons/94600…00&foregroundOpacity=1&imageFormat=png&rotation=0",
          //   scaledSize: {
          //     width: 20,
          //     height: 20,
          //   },
          // }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2">
              <p className="text-black">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}
      {/* Child components, such as markers, info windows, etc. */}
      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSection;

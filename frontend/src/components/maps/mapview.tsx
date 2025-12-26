"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

type LatLng = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Doctor = {      // ADDED: Type for doctor data
  id: number;
  name: string;
  lat: number;
  lng: number;
};

interface MapViewProps {
  onClinicsFound?: (clinics: google.maps.places.PlaceResult[]) => void;
}

export default function MapView({ onClinicsFound }: MapViewProps) {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]); // ADDED: state to store nearby doctors


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);

        // ADDED: fetch nearby doctors dynamically
        // fetchNearbyDoctors(userLocation.lat, userLocation.lng);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError(`${error.code}: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }, []);

  // ADDED: function to fetch nearby doctors from backend
  function fetchNearbyClinics(
    map: google.maps.Map,
    location: google.maps.LatLngLiteral
  ) {
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location,
        radius: 3000, // meters (3km)
        type: "hospital", // use "doctor" if needed
      },
      (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          if (onClinicsFound) {
            onClinicsFound(results);
          }
        }
      }
    );
  }


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!location) {
    return <p>Detecting your current location...</p>;
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}
        onLoad={(map) => fetchNearbyClinics(map, location!)}>
        {/* User location marker */}
        <Marker position={location} />

        {/* ADDED: Markers for nearby doctors */}
        {doctors.map((doc) => (
          <Marker
            key={doc.id}
            position={{ lat: doc.lat, lng: doc.lng }}
            label={doc.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

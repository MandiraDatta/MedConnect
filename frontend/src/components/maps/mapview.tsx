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

const DEFAULT_LOCATION: LatLng = {
  lat: 28.6139,
  lng: 77.2090, // Delhi, India
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
  const [location, setLocation] = useState<LatLng>(DEFAULT_LOCATION);
  const [isLocating, setIsLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Don't block the UI, just show a message if needed
        // setError(`${error.code}: ${error.message}`);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: false, // Changed from true to improve speed/reliability
        timeout: 10000, // Reduced timeout
        maximumAge: 5 * 60 * 1000, // 5 minutes cache
      }
    );
  }, []);

  // Trigger search when location or map changes
  useEffect(() => {
    if (map && location) {
      fetchNearbyClinics(map, location);
    }
  }, [map, location]);

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


  return (
    <div className="relative">
      {isLocating && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 px-3 py-1 rounded-full text-xs shadow-sm border">
          Locating...
        </div>
      )}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
          onLoad={(map) => setMap(map)}
        >
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
    </div>
  );
}

import { Share } from "react-native"

const SharePlace = (place) => {
    const latitude = place.geometry.location.lat;
    const longitude = place.geometry.location.lng;
    
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Share.share({
        title: 'Share Medical Center',
        message: `Medical Center Name: ${place.name}\nAddress: ${place.vicinity ? place.vicinity : place.formatted_address}\n\nGet Directions: ${googleMapsUrl}`,
    });
}

export default {
    SharePlace
}

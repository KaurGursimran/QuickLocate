import type { Place } from "./Place";

interface SearchResponse {
    features: {
        geometry: {
            coordinates: number[];
        }
        properties: {
            place_id: number;
            display_name: string;
        }
    }[]
}

export const search = async (term: string) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
    );
    const data: SearchResponse = await res.json();

    const places: Place[] = data.features.map((features) => {
        return {
            id: features.properties.place_id,
            name: features.properties.display_name,
            longitude: features.geometry.coordinates[0],
            latitude: features.geometry.coordinates[1]
        }
    })

    return places;
}
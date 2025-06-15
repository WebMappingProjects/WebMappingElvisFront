// Fonction utilitaire pour convertir toutes les coordonnées d'un GeoJSON (Point, LineString, Polygon, Multi*) en EPSG:4326 si besoin
import { ensureEPSG4326 } from "../utils/tools";

function convertGeoJSONTo4326(geojson) {
  if (!geojson) return geojson;

  // Fonction récursive pour convertir les coordonnées
  function convertCoords(coords) {
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      // Point
      return ensureEPSG4326(coords).coords;
    } else if (Array.isArray(coords[0])) {
      // LineString, Polygon, Multi*
      return coords.map(convertCoords);
    }
    return coords;
  }

  if (geojson.type === "FeatureCollection") {
    return {
      ...geojson,
      features: geojson.features.map(f => convertGeoJSONTo4326(f)),
    };
  } else if (geojson.type === "Feature") {
    return {
      ...geojson,
      geometry: convertGeoJSONTo4326(geojson.geometry),
    };
  } else if (
    ["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"].includes(geojson.type)
  ) {
    return {
      ...geojson,
      coordinates: convertCoords(geojson.coordinates),
    };
  }
  return geojson;
}

export default convertGeoJSONTo4326;

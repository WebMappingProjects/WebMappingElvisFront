import proj4 from "proj4";

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Converts coordinates between EPSG:4326 (lat/lon) and EPSG:32632 (UTM zone 32N).
 * Automatically detects the input CRS based on value ranges.
 * @param {[number, number]} coords - Input coordinates ([x, y] or [lon, lat] or [easting, northing])
 * @returns {[number, number]} - Converted coordinates
 */
export function convertCoords(coords) {
    // EPSG:4326: longitude [-180, 180], latitude [-90, 90]
    // EPSG:32632: easting [166021, 833978], northing [0, 9329005]
    // UTM zone 32N covers longitude 6°E to 12°E, easting ~ 166021 to 833978

    // Heuristic: if both values are in [-180, 180], treat as lon/lat (EPSG:4326)
    const [x, y] = coords;
    const is4326 = Math.abs(x) <= 180 && Math.abs(y) <= 90;

    if (is4326) {
        // EPSG:4326 to EPSG:32632
        // Use proj4js for conversion
        // Make sure proj4 is installed: npm install proj4
        // Import proj4 at the top of your file:
        // import proj4 from "proj4";
        const epsg4326 = "EPSG:4326";
        const epsg32632 = "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs";
        return { coords: proj4(epsg4326, epsg32632, coords), epsg: 4326 };
    } else {
        // EPSG:32632 to EPSG:4326
        const epsg4326 = "EPSG:4326";
        const epsg32632 = "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs";
        return { coords: proj4(epsg32632, epsg4326, coords), epsg: 32632 };
    }
}

/**
 * Detects if coordinates are in EPSG:4326 (lon/lat) and returns them as is.
 * If in EPSG:32632 (UTM zone 32N), converts them to EPSG:4326.
 * @param {[number, number]} coords - Input coordinates
 * @returns {[number, number]} - Coordinates in EPSG:4326
 */
export function ensureEPSG4326(coords) {
    const [x, y] = coords;
    const is4326 = Math.abs(x) <= 180 && Math.abs(y) <= 90;
    if (is4326) {
        return { "coords": coords, epsg: 4326 };
    } else {
        const epsg4326 = "EPSG:4326";
        const epsg32632 = "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs";
        return { coords: proj4(epsg32632, epsg4326, coords), epsg: 32632 };
    }
}
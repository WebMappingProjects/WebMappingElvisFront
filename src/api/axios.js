import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8008/api";
export default axios.create({
   baseURL: API_URL
})

export const API_COMMUNE_URL = `/gis/communes`;
export const API_REGIONS_URL = `/gis/regions`;
export const API_DEPARTEMENTS_URL = `/gis/departements`;
export const API_CENTRE_SANTE_URL = `/gis/centres-sante`;
export const API_PHARMACIE_URL = `/gis/pharmacie`;

import axios from "axios";

export default axios.create({
   baseURL: "http://localhost:8008/api"
})

export const API_COMMUNE_URL = `/gis/communes`;
export const API_REGIONS_URL = `/gis/regions`;
export const API_DEPARTEMENTS_URL = `/gis/departements`;
export const API_CENTRE_SANTE_URL = `/gis/centres-sante`;
export const API_PHARMACIE_URL = `/gis/pharmacie`;

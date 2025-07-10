import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import PropTypes from "prop-types";
import { useAppMainContext } from "../../context/AppProvider";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ConfirmMessagePopup from "../popups/ConfirmMessagePopup";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DrawableLeafletMap = () => {
  const { currentEditionPoint, setCurrentEditionPoint,
    currentEditionFig, setCurrentEditionFig
   } = useAppMainContext();

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const drawControlRef = useRef(null);
  const selectedMarkerRef = useRef(null);
  const vertexMarkersRef = useRef([]);
  const geoJsonLayerRef = useRef(null); // For drawing currentEditionFig
  // Draw currentEditionFig on the map if present
  useEffect(() => {
    if (!mapInstance.current) return;
    // Remove previous geometry
    if (geoJsonLayerRef.current) {
      mapInstance.current.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }
    if (currentEditionFig) {
      try {
        geoJsonLayerRef.current = L.geoJSON(currentEditionFig, {
          style: { color: '#3B82F6', weight: 3, fillOpacity: 0.2 },
          pointToLayer: (feature, latlng) => L.circleMarker(latlng, { radius: 7, color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.8 })
        }).addTo(mapInstance.current);
        // Optionally fit bounds
        if (geoJsonLayerRef.current.getBounds && geoJsonLayerRef.current.getBounds().isValid()) {
          mapInstance.current.fitBounds(geoJsonLayerRef.current.getBounds(), { maxZoom: 15 });
        }
      } catch (e) {
        // Ignore invalid geometry
      }
    }
  }, [currentEditionFig]);

  // Ajout d'état pour la popup de confirmation et le message à afficher
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState(false);
  const [confirmPopupMessage, setConfirmPopupMessage] = useState("");
  const [entityToDelete, setEntityToDelete] = useState(null);

  // State for marker position
  const [markerPos, setMarkerPos] = useState(
    currentEditionPoint && Array.isArray(currentEditionPoint) && currentEditionPoint.length === 2
      ? { lat: currentEditionPoint[0], lng: currentEditionPoint[1] }
      : { lat: 0, lng: 0 }
  );

  // Fonction pour créer un marqueur de sommet
  const createVertexMarker = (latlng, parentLayer, index) => {
    const marker = L.circleMarker(latlng, { 
      radius: 6, 
      color: '#3B82F6', 
      fillColor: '#3B82F6',
      fillOpacity: 0.8,
      weight: 2,
      draggable: false // On gère le drag manuellement
    }).addTo(mapInstance.current);
    
    marker.originalLatLng = latlng;
    marker.parentLayer = parentLayer;
    marker.vertexIndex = index;
    vertexMarkersRef.current.push(marker);
    
    // Gestion du clic sur le marqueur
    marker.on('click', (e) => {
      if (e.originalEvent) {
        e.originalEvent.stopPropagation();
      }
      selectMarker(marker);
    });

    // Gestion du drag and drop
    let isDragging = false;
    let dragStartPos = null;

    marker.on('mousedown', (e) => {
      if (e.originalEvent) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
      }
      
      isDragging = false;
      dragStartPos = { x: e.originalEvent.clientX, y: e.originalEvent.clientY };
      
      // Désactiver le déplacement de la carte
      mapInstance.current.dragging.disable();
      mapInstance.current.touchZoom.disable();
      mapInstance.current.doubleClickZoom.disable();
      mapInstance.current.scrollWheelZoom.disable();
      mapInstance.current.boxZoom.disable();
      mapInstance.current.keyboard.disable();
      
      const onMouseMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        
        if (!isDragging) {
          const dx = moveEvent.clientX - dragStartPos.x;
          const dy = moveEvent.clientY - dragStartPos.y;
          if (Math.sqrt(dx * dx + dy * dy) > 5) {
            isDragging = true;
            selectMarker(marker);
          }
        }
        
        if (isDragging) {
          const containerPoint = mapInstance.current.mouseEventToContainerPoint(moveEvent);
          const newLatLng = mapInstance.current.containerPointToLatLng(containerPoint);
          
          // Mettre à jour la position du marqueur
          marker.setLatLng(newLatLng);
          
          // Mettre à jour la géométrie parent
          updateParentGeometry(marker, newLatLng);
          
          // Mettre à jour les coordonnées dans l'interface
          setMarkerPos({ lat: newLatLng.lat, lng: newLatLng.lng });
          setCurrentEditionPoint([newLatLng.lat, newLatLng.lng]);
        }
      };

      const onMouseUp = (upEvent) => {
        upEvent.preventDefault();
        upEvent.stopPropagation();
        
        // Réactiver le déplacement de la carte
        mapInstance.current.dragging.enable();
        mapInstance.current.touchZoom.enable();
        mapInstance.current.doubleClickZoom.enable();
        mapInstance.current.scrollWheelZoom.enable();
        mapInstance.current.boxZoom.enable();
        mapInstance.current.keyboard.enable();
        
        if (isDragging) {
          isDragging = false;
          marker.originalLatLng = marker.getLatLng();
        }
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    return marker;
  };

  // Fonction pour sélectionner un marqueur
  const selectMarker = (marker) => {
    // Réinitialiser le style de l'ancien marqueur sélectionné
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setStyle({
        radius: 6,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.8,
        weight: 2
      });
    }
    
    // Mettre à jour le style du nouveau marqueur sélectionné
    marker.setStyle({
      radius: 8,
      color: '#EF4444',
      fillColor: '#FCA5A5',
      fillOpacity: 1,
      weight: 3
    });
    
    selectedMarkerRef.current = marker;
    const latlng = marker.getLatLng();
    setMarkerPos({ lat: latlng.lat, lng: latlng.lng });
    setCurrentEditionPoint([latlng.lat, latlng.lng]);
  };

  // Fonction pour mettre à jour currentEditionPoint après modification
  const updateCurrentEditionPoint = (layer) => {
    const latlngs = layer.getLatLngs();
    const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
    const coordinates = points.map(point => [point.lng, point.lat]);
    
    if (layer instanceof L.Polygon) {
      coordinates.push(coordinates[0]); // Fermer le polygone
      setCurrentEditionFig({
        type: "MultiPolygon",
        coordinates: [coordinates]
      });
    } else {
      setCurrentEditionFig({
        type: "LineString",
        coordinates: coordinates
      });
    }
  };

  // Fonction pour mettre à jour la géométrie parent
  const updateParentGeometry = (marker, newLatLng) => {
    const parentLayer = marker.parentLayer;
    if (parentLayer) {
      const latlngs = parentLayer.getLatLngs();
      const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
      
      points[marker.vertexIndex] = newLatLng;
      parentLayer.setLatLngs(Array.isArray(latlngs[0]) ? [points] : points);
      
      updateCurrentEditionPoint(parentLayer);
    }
  };

  // Fonction pour recréer tous les marqueurs de sommet
  const recreateVertexMarkers = (parentLayer) => {
    // Supprimer les anciens marqueurs de cette couche
    vertexMarkersRef.current = vertexMarkersRef.current.filter(marker => {
      if (marker.parentLayer === parentLayer) {
        marker.remove();
        return false;
      }
      return true;
    });

    // Créer de nouveaux marqueurs
    const latlngs = parentLayer.getLatLngs();
    const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
    points.forEach((latlng, index) => {
      createVertexMarker(latlng, parentLayer, index);
    });
  };

  // Fonction pour ajouter un point sur un segment
  const addPointOnSegment = (parentLayer, insertIndex, newPoint) => {
    const latlngs = parentLayer.getLatLngs();
    const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
    
    // Insérer le nouveau point
    points.splice(insertIndex, 0, newPoint);
    
    // Mettre à jour la géométrie
    parentLayer.setLatLngs(Array.isArray(latlngs[0]) ? [points] : points);
    
    updateCurrentEditionPoint(parentLayer);
    
    // Recréer tous les marqueurs avec les nouveaux indices
    recreateVertexMarkers(parentLayer);
    
    // Sélectionner automatiquement le nouveau point
    setTimeout(() => {
      const newMarker = vertexMarkersRef.current.find(marker => 
        marker.parentLayer === parentLayer && marker.vertexIndex === insertIndex
      );
      if (newMarker) {
        selectMarker(newMarker);
      }
    }, 100);
  };

  // Fonction pour supprimer une entité (ligne ou polygone) entière
  const handleDeleteEntity = () => {
    if (entityToDelete && mapInstance.current) {
      // Supprimer la couche de la carte
      mapInstance.current.removeLayer(entityToDelete);
      // Supprimer tous les marqueurs associés à cette couche
      vertexMarkersRef.current = vertexMarkersRef.current.filter(marker => {
        if (marker.parentLayer === entityToDelete) {
          marker.remove();
          return false;
        }
        return true;
      });
      selectedMarkerRef.current = null;
      setEntityToDelete(null);
      setConfirmPopupVisible(false);
      setCurrentEditionPoint(null);
      setCurrentEditionFig(null);
      setMessagePopupVisible(true);
    }
  };

  // Fonction pour supprimer le point actif
  const handleDeleteActivePoint = () => {
    if (selectedMarkerRef.current) {
      const marker = selectedMarkerRef.current;
      const parentLayer = marker.parentLayer;

      if (parentLayer) {
        const latlngs = parentLayer.getLatLngs();
        const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;

        // Vérifier qu'il reste au moins 2 points pour une ligne ou 3 pour un polygone
        const isPolygon = parentLayer instanceof L.Polygon;
        const minPoints = isPolygon ? 3 : 2;
        if (points.length <= minPoints) {
          // Afficher la popup de confirmation pour supprimer toute la géométrie
          setEntityToDelete(parentLayer);
          setConfirmPopupMessage(
            isPolygon
              ? "Un polygone doit avoir au moins 3 points. Voulez-vous supprimer tout le polygone ?"
              : "Une ligne doit avoir au moins 2 points. Voulez-vous supprimer toute la ligne ?"
          );
          setConfirmPopupVisible(true);
          return;
        }

        // Supprimer le point
        points.splice(marker.vertexIndex, 1);
        parentLayer.setLatLngs(Array.isArray(latlngs[0]) ? [points] : points);

        updateCurrentEditionPoint(parentLayer);
        
        // Recréer tous les marqueurs
        recreateVertexMarkers(parentLayer);

        // Désélectionner le marqueur
        selectedMarkerRef.current = null;
        setMarkerPos({ lat: 3.868177, lng: 11.519596 });
        setCurrentEditionPoint(null);
      }
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte seulement une fois
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([ markerPos.lat == 0 ? 3.868177 : markerPos.lat, markerPos.lng == 0 ? 11.519596 : markerPos.lng ], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      drawControlRef.current = new L.Control.Draw({
        draw: false,
        edit: false,
      });
      mapInstance.current.addControl(drawControlRef.current);

      mapInstance.current.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        layer.addTo(mapInstance.current);

        // Si c'est une ligne ou un polygone, on ajoute les marqueurs de sommet
        if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
          const latlngs = layer.getLatLngs();
          const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
          
          // Convertir en format GeoJSON
          const coordinates = points.map(point => [point.lng, point.lat]);
          
          if (layer instanceof L.Polygon) {
            // Pour un polygone, fermer la géométrie
            coordinates.push(coordinates[0]);
            setCurrentEditionFig({
              type: "Polygon",
              coordinates: [coordinates]
            });
          } else {
            // Pour une ligne
            setCurrentEditionFig({
              type: "LineString",
              coordinates: coordinates
            });
          }
          
          points.forEach((latlng, index) => {
            createVertexMarker(latlng, layer, index);
          });

          // Ajouter un gestionnaire de clic sur la ligne/polygone pour ajouter des points
          layer.on('click', function(e) {
            // Vérifier si le clic provient d'un marqueur de sommet
            const clickedOnVertex = vertexMarkersRef.current.some(marker => {
              const markerLatLng = marker.getLatLng();
              const clickLatLng = e.latlng;
              const distance = Math.sqrt(
                Math.pow(markerLatLng.lat - clickLatLng.lat, 2) + 
                Math.pow(markerLatLng.lng - clickLatLng.lng, 2)
              );
              return distance < 0.001; // Seuil de tolérance
            });
            
            // Si le clic est sur un marqueur de sommet, ne pas ajouter de point
            if (clickedOnVertex) {
              return;
            }
            
            if (e.originalEvent) {
              e.originalEvent.stopPropagation();
            }
            
            const clickedPoint = e.latlng;
            const currentPoints = layer.getLatLngs();
            const points = Array.isArray(currentPoints[0]) ? currentPoints[0] : currentPoints;
            
            // Trouver le segment le plus proche du clic
            let minDistance = Infinity;
            let insertIndex = 1;
            let closestPointOnSegment = null;
            
            for (let i = 0; i < points.length; i++) {
              const nextIndex = (i + 1) % points.length;
              
              // Pour les lignes, ne pas considérer le segment de fermeture
              if (layer instanceof L.Polyline && nextIndex === 0) continue;
              
              const segmentStart = points[i];
              const segmentEnd = points[nextIndex];
              
              // Calculer le point le plus proche sur le segment
              const segmentVector = {
                lat: segmentEnd.lat - segmentStart.lat,
                lng: segmentEnd.lng - segmentStart.lng
              };
              
              const clickVector = {
                lat: clickedPoint.lat - segmentStart.lat,
                lng: clickedPoint.lng - segmentStart.lng
              };
              
              const segmentLengthSquared = segmentVector.lat * segmentVector.lat + segmentVector.lng * segmentVector.lng;
              
              if (segmentLengthSquared === 0) {
                // Le segment est un point
                const distance = Math.sqrt(clickVector.lat * clickVector.lat + clickVector.lng * clickVector.lng);
                if (distance < minDistance) {
                  minDistance = distance;
                  insertIndex = nextIndex;
                  closestPointOnSegment = segmentStart;
                }
                continue;
              }
              
              const t = Math.max(0, Math.min(1, (clickVector.lat * segmentVector.lat + clickVector.lng * segmentVector.lng) / segmentLengthSquared));
              
              const closestPoint = {
                lat: segmentStart.lat + t * segmentVector.lat,
                lng: segmentStart.lng + t * segmentVector.lng
              };
              
              const distance = Math.sqrt(
                Math.pow(clickedPoint.lat - closestPoint.lat, 2) + 
                Math.pow(clickedPoint.lng - closestPoint.lng, 2)
              );
              
              if (distance < minDistance) {
                minDistance = distance;
                insertIndex = nextIndex;
                closestPointOnSegment = closestPoint;
              }
            }
            
            // Ajouter le point sur le segment (utiliser le point projeté sur le segment)
            if (closestPointOnSegment) {
              addPointOnSegment(layer, insertIndex, L.latLng(closestPointOnSegment.lat, closestPointOnSegment.lng));
            }
          });
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  // Fonction pour calculer la distance d'un point à un segment (fallback si L.GeometryUtil n'est pas disponible)
  const calculateDistanceToSegment = (point, segmentStart, segmentEnd) => {
    const A = point.lat - segmentStart.lat;
    const B = point.lng - segmentStart.lng;
    const C = segmentEnd.lat - segmentStart.lat;
    const D = segmentEnd.lng - segmentStart.lng;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    
    if (lenSq === 0) {
      return Math.sqrt(A * A + B * B);
    }
    
    const param = dot / lenSq;
    let xx, yy;
    
    if (param < 0) {
      xx = segmentStart.lat;
      yy = segmentStart.lng;
    } else if (param > 1) {
      xx = segmentEnd.lat;
      yy = segmentEnd.lng;
    } else {
      xx = segmentStart.lat + param * C;
      yy = segmentStart.lng + param * D;
    }
    
    const dx = point.lat - xx;
    const dy = point.lng - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Effet séparé pour mettre à jour la position du marqueur sans recréer la carte
  useEffect(() => {
    if (currentEditionPoint && Array.isArray(currentEditionPoint) && currentEditionPoint.length === 2) {
      setMarkerPos({ lat: currentEditionPoint[0], lng: currentEditionPoint[1] });
    }
  }, [currentEditionPoint]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newMarkerPos = {
      ...markerPos,
      [name]: parseFloat(value)
    };
    setMarkerPos(newMarkerPos);
    setCurrentEditionPoint([
      name === "lat" ? parseFloat(value) : markerPos.lat,
      name === "lng" ? parseFloat(value) : markerPos.lng
    ]);
  };

  // Fonction pour repositionner le point sélectionné
  const handleRepositionPoint = () => {
    if (selectedMarkerRef.current && mapInstance.current) {
      const newLatLng = L.latLng(markerPos.lat, markerPos.lng);
      
      // Mettre à jour la position du marker sélectionné
      selectedMarkerRef.current.setLatLng(newLatLng);
      
      // Mettre à jour la géométrie parent
      updateParentGeometry(selectedMarkerRef.current, newLatLng);
      
      // Mettre à jour les coordonnées originales
      selectedMarkerRef.current.originalLatLng = newLatLng;
      
      // Centrer la carte sur le nouveau point
      mapInstance.current.setView([markerPos.lat, markerPos.lng], mapInstance.current.getZoom());
    }
  };

  // Fonctions pour activer le dessin
  const handleDrawLine = () => {
    if (mapInstance.current) {
      new L.Draw.Polyline(mapInstance.current).enable();
    }
  };

  const handleDrawPolygon = () => {
    if (mapInstance.current) {
      new L.Draw.Polygon(mapInstance.current).enable();
    }
  };

  // Fonction pour vider la carte
  const handleClearMap = () => {
    if (mapInstance.current) {
      const baseLayerId = Object.keys(mapInstance.current._layers)[0];
      mapInstance.current.eachLayer((layer) => {
        if (layer._leaflet_id !== parseInt(baseLayerId)) {
          if (layer.remove && typeof layer.remove === "function") layer.remove();
        }
      });
      vertexMarkersRef.current = [];
      selectedMarkerRef.current = null;
    }
  };

  // Fonction pour désélectionner le point actif et réactiver la navigation
  const unselectMarker = () => {
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setStyle({
        radius: 6,
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.8,
        weight: 2
      });
    }
    selectedMarkerRef.current = null;
    if (mapInstance.current) {
      mapInstance.current.dragging.enable();
      mapInstance.current.touchZoom.enable();
      mapInstance.current.doubleClickZoom.enable();
      mapInstance.current.scrollWheelZoom.enable();
      mapInstance.current.boxZoom.enable();
      mapInstance.current.keyboard.enable();
    }
    setCurrentEditionPoint(null);
    setMarkerPos({ lat: 0, lng: 0 });
  };

  return (
    <>
      {/* Popups personnalisées */}
      <SimpleMessagePopup
        message="Suppression effectuée avec succès"
        onClose={() => setMessagePopupVisible(false)}
        open={messagePopupVisible}
      />
      <ConfirmMessagePopup
        message={confirmPopupMessage}
        onConfirm={handleDeleteEntity}
        onCancel={() => {
          setConfirmPopupVisible(false);
          setEntityToDelete(null);
        }}
        open={confirmPopupVisible}
      />

      <div className="relative w-full rounded-lg shadow-lg overflow-hidden h-[300px]">
        <div className="h-full rounded-lg" ref={mapRef} style={{ minHeight: 300, minWidth: 300 }} />
      </div>
      
      {/* Formulaire avec design amélioré */}
      <div className="p-4 mt-4 border border-blue-200 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="flex items-center mb-3 text-lg font-semibold text-gray-800">
          <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
          Coordonnées du point
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="lat"
              value={markerPos.lat}
              onChange={handleInputChange}
              className="w-32 px-3 py-2 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Latitude"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="lng"
              value={markerPos.lng}
              onChange={handleInputChange}
              className="w-32 px-3 py-2 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Longitude"
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleRepositionPoint}
              disabled={!selectedMarkerRef.current}
              className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedMarkerRef.current
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              Repositionner
            </button>
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleDeleteActivePoint}
              disabled={!selectedMarkerRef.current}
              className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedMarkerRef.current
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={unselectMarker}
              disabled={!selectedMarkerRef.current}
              className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedMarkerRef.current
                  ? 'bg-gray-400 hover:bg-gray-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
              </svg>
              Désélectionner
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          className="group text-sm cursor-pointer md:w-[200px] w-full relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleDrawLine}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Dessiner une ligne
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:opacity-100"></div>
        </button>
        
        <button
          type="button"
          className="group text-sm relative md:w-[200px] w-full cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleDrawPolygon}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10l2 5-2 5H7l-2-5 2-5z" />
            </svg>
            Dessiner un polygone
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-green-600 to-green-700 group-hover:opacity-100"></div>
        </button>

        <button
          type="button"
          className="group text-sm md:w-[200px] w-full relative cursor-pointer px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleClearMap}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Vider la carte
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:opacity-100"></div>
        </button>
      </div>

      {/* Instructions d'utilisation */}
      <div className="p-3 mt-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="mb-2 font-medium text-gray-800">Instructions d'utilisation :</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• <strong>Cliquez</strong> sur un point pour le sélectionner</li>
          <li>• <strong>Glissez</strong> un point sélectionné pour le déplacer</li>
          <li>• <strong>Cliquez sur un segment</strong> pour ajouter un nouveau point</li>
          <li>• <strong>Utilisez le bouton &quot;Supprimer&quot;</strong> pour retirer le point actif</li>
        </ul>
      </div>
    </>
  );
}

DrawableLeafletMap.propTypes = {
  layer: PropTypes.string.isRequired,
  attrib: PropTypes.string.isRequired,
};

export default DrawableLeafletMap;
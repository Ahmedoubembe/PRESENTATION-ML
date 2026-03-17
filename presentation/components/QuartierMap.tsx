'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default icon URLs for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export const QUARTIERS_GPS: Record<string, { lat: number; lon: number; desc: string }> = {
  'Tevragh Zeina': { lat: 18.1036, lon: -15.9785, desc: 'Quartier huppé, ambassades' },
  'Ksar':          { lat: 18.0866, lon: -15.9750, desc: 'Centre historique' },
  'Arafat':        { lat: 18.0550, lon: -15.9610, desc: 'Populaire, dense' },
  'Dar Naim':      { lat: 18.1200, lon: -15.9450, desc: 'Résidentiel, en expansion' },
  'Toujounine':    { lat: 18.0680, lon: -15.9350, desc: 'Périphérie, récent' },
  'Sebkha':        { lat: 18.0730, lon: -15.9870, desc: 'Commercial, marchés' },
  'Riyadh':        { lat: 18.0850, lon: -15.9550, desc: 'Résidentiel moyen' },
  'Teyarett':      { lat: 18.0950, lon: -15.9700, desc: 'Centre, mixte' },
}

function formatPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(prix)) + ' MRU'
}

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lon], 13, { animate: true })
  }, [lat, lon, map])
  return null
}

interface QuartierMapProps {
  selectedQuartier: string
  prixEstime?: number
}

export default function QuartierMap({ selectedQuartier, prixEstime }: QuartierMapProps) {
  const center = selectedQuartier && QUARTIERS_GPS[selectedQuartier]
    ? QUARTIERS_GPS[selectedQuartier]
    : { lat: 18.0785, lon: -15.9654 }

  return (
    <MapContainer
      center={[center.lat, center.lon]}
      zoom={12}
      style={{ height: '320px', width: '100%', borderRadius: '0.75rem' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedQuartier && QUARTIERS_GPS[selectedQuartier] && (
        <>
          <RecenterMap
            lat={QUARTIERS_GPS[selectedQuartier].lat}
            lon={QUARTIERS_GPS[selectedQuartier].lon}
          />
          <Marker
            position={[
              QUARTIERS_GPS[selectedQuartier].lat,
              QUARTIERS_GPS[selectedQuartier].lon,
            ]}
          >
            <Popup>
              <div className="text-sm font-semibold">{selectedQuartier}</div>
              <div className="text-xs text-gray-600">{QUARTIERS_GPS[selectedQuartier].desc}</div>
              {prixEstime && (
                <div className="mt-1 text-sm font-bold text-blue-600">
                  {formatPrix(prixEstime)}
                </div>
              )}
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  )
}

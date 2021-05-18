import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback, useEffect } from 'react'

import MapGL from 'react-map-gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'
import mapboxgl from 'mapbox-gl'
import RenderScene from '../renderScene'

import Button from '@material-ui/core/Button'
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2h1YmhhbWt1bWF3YXQ3ODkiLCJhIjoiY2tvM3hoOG9kMWRtMjJ1azQwNmlqMmpkdiJ9.1rAuBqANI9uOd4bzVbdxyg'
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2h1YmhhbWt1bWF3YXQ3ODkiLCJhIjoiY2tvM3hoOG9kMWRtMjJ1azQwNmlqMmpkdiJ9.1rAuBqANI9uOd4bzVbdxyg'

const Test = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  })
  const [showCube, setShowCube] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [searchResultLayer, setSearchResultLayer] = useState(null)
  const mapRef = useRef()
  const geocoderContainerRef = useRef()
  useEffect(() => {
    setImageUrl({
      imageUrl: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},0/${viewport.width}x${viewport.height}?access_token=${mapboxgl.accessToken}`,
    })
    console.log(imageUrl)
  }, [showCube])
  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()
  }, [])
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  )
  const resize = () => {
    handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  const handleOnResult = (event) => {
    setSearchResultLayer(
      new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      }),
    )
  }

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      })
    },
    [handleViewportChange],
  )

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            height: '95vh',
            width: '50vw',
          }}>
          <div
            style={{
              height: 40,
              background: 'black',
              display: 'flex',
              alignItems: 'center',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <Button
              variant='contained'
              color='white'
              style={{ fontSize: 'bold' }}
              onClick={() => {
                setShowCube({ showCube: !showCube })

                console.log(imageUrl)
              }}>
              {showCube ? 'Hide' : 'Show'} 3D
            </Button>
          </div>
          <MapGL
            ref={mapRef}
            containerRef={geocoderContainerRef}
            {...viewport}
            width='100%'
            height='100%'
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}>
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position='top-left'
            />
            <DeckGL {...viewport} layers={[searchResultLayer]} />
          </MapGL>
        </div>
        <div
          style={{
            height: '90vh',
            width: '50vw',
          }}>
          {showCube && <RenderScene texturePath={imageUrl} />}
        </div>
      </div>
    </>
  )
}

export default Test

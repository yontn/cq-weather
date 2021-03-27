import { Box } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import useGeolocation from 'react-hook-geolocation';
import { getDetails, getGeocode } from 'use-places-autocomplete';
import { ADD_TO_LIST_TEXT } from '../consts';
import { useCitiesStore } from '../stores/CitiesStore';
import { PlacePayload } from '../types';
import detailsResultToPlacePayload from '../utils/detailsResultToPlacePayload';
import { useGetWeatherByLocationNameQuery } from '../__generated__/src/graphql/GetWeatherByLocationName.graphql-GetWeatherByLocationName-LocationWeather';
import { CityCard } from './CityCard';
import { Loading } from './Loading';

export const CurrentLocationCard = observer(() => {
  const geolocation = useGeolocation();
  const { addToCities, cities } = useCitiesStore();
  const [currentPlace, setCurrentPlace] = useState<PlacePayload>({
    country: '',
    name: '',
  });
  const { name, country } = currentPlace;
  const {
    error,
    data: currentLocationWeather,
  } = useGetWeatherByLocationNameQuery({
    variables: { name, country },
    skip: !name || !country,
  });

  useEffect(() => {
    let active = true;
    if (!geolocation.error) {
      getGeocode({
        location: { lat: geolocation.latitude, lng: geolocation.longitude },
      }).then(async ([geocodeResult]) => {
        if (active) {
          const details = await getDetails({
            placeId: geocodeResult?.place_id,
            fields: ['address_components', 'geometry', 'icon', 'name'],
          });
          setCurrentPlace(detailsResultToPlacePayload(details));
        }
      });
    } else {
      setCurrentPlace({ name: 'New York', country: 'US' });
    }
    return () => {
      active = false;
    };
  }, [geolocation]);

  if (error) return <p>Error :{JSON.stringify(error)}</p>;

  return (
    <Box mb={6} minWidth={345}>
      {!currentLocationWeather ? (
        <Loading />
      ) : (
        <>
          <CityCard
            {...currentLocationWeather.getCityByName}
            actionHandler={
              currentLocationWeather?.getCityByName?.id &&
              !cities.has(currentLocationWeather.getCityByName.id)
                ? addToCities
                : null
            }
            actionText={
              currentLocationWeather?.getCityByName?.id &&
              !cities.has(currentLocationWeather.getCityByName.id)
                ? ADD_TO_LIST_TEXT
                : null
            }
          />
        </>
      )}
    </Box>
  );
});

import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useCitiesStore } from '../stores/CitiesStore';
import { useGetWeatherByLocationNameLazyQuery } from '../__generated__/src/graphql/GetWeatherByLocationName.graphql-GetWeatherByLocationName-LocationWeather';
import { CitiesList } from './CitiesList';
import { CurrentLocationCard } from './CurrentLocationCard';
import GoogleMapsPlacesAutocomplete from './GoogleMapsPlacesAutocomplete';
import GoogleScriptLoader from './GoogleScriptLoader';

const App = observer(() => {
  const [loaded, setLoaded] = useState(false);

  const { addToCities } = useCitiesStore();
  const [
    getWeatherByLocationName,
    { data },
  ] = useGetWeatherByLocationNameLazyQuery({ fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (data?.getCityByName) {
      addToCities(data?.getCityByName?.id, data?.getCityByName?.name);
    }
  }, [data, addToCities]);

  return (
    <Container maxWidth='lg' style={{ padding: '60px 0' }}>
      <GoogleScriptLoader loaded={loaded} onLoad={() => setLoaded(true)}>
        <Container style={{ minHeight: 390 }}>
          <Grid container>
            <CurrentLocationCard />
            <Box mb={6} mx={2}>
              <GoogleMapsPlacesAutocomplete
                onChange={async (placePayload) => {
                  if (placePayload) {
                    getWeatherByLocationName({
                      variables: placePayload,
                    });
                  }
                }}
              />
            </Box>
          </Grid>
        </Container>
        <CitiesList />
      </GoogleScriptLoader>
    </Container>
  );
});

export default App;

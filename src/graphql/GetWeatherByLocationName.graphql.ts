import { gql } from 'graphql-let/macro';

export default gql(`
  # import LocationWeather from '../graphql/LocationWeather.graphql'

  query GetWeatherByLocationName($name: String!, $country: String!) {
    getCityByName(name: $name, country: $country, config: { units: metric, lang: en }) {
      ...LocationWeather
    }
  }
`);

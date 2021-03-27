import { gql } from 'graphql-let/macro';

export default gql(`
  # import LocationWeather from '../graphql/LocationWeather.graphql'

  query GetWeatherByLocationIds($ids: [String!]) {
    items: getCityById(id: $ids, config: { units: metric, lang: en }) {
      ...LocationWeather
    }
  }
`);

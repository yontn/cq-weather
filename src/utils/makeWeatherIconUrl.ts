export default function makeWeatherIconUrl(iconId: string | null = '') {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}

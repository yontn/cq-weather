import { CardinalDirection } from '../consts';

export default function degreeToCardinalDirection(
  deg: number | undefined = 0
): CardinalDirection {
  if (deg > 11.25 && deg <= 33.75) {
    return CardinalDirection.NNE;
  } else if (deg > 33.75 && deg <= 56.25) {
    return CardinalDirection.NE;
  } else if (deg > 56.25 && deg <= 78.75) {
    return CardinalDirection.ENE;
  } else if (deg > 78.75 && deg <= 101.25) {
    return CardinalDirection.E;
  } else if (deg > 101.25 && deg <= 123.75) {
    return CardinalDirection.ESE;
  } else if (deg > 123.75 && deg <= 146.25) {
    return CardinalDirection.SE;
  } else if (deg > 146.25 && deg <= 168.75) {
    return CardinalDirection.SSE;
  } else if (deg > 168.75 && deg <= 191.25) {
    return CardinalDirection.S;
  } else if (deg > 191.25 && deg <= 213.75) {
    return CardinalDirection.SSW;
  } else if (deg > 213.75 && deg <= 236.25) {
    return CardinalDirection.SW;
  } else if (deg > 236.25 && deg <= 258.75) {
    return CardinalDirection.WSW;
  } else if (deg > 258.75 && deg <= 281.25) {
    return CardinalDirection.W;
  } else if (deg > 281.25 && deg <= 303.75) {
    return CardinalDirection.WNW;
  } else if (deg > 303.75 && deg <= 326.25) {
    return CardinalDirection.NW;
  } else if (deg > 326.25 && deg <= 348.75) {
    return CardinalDirection.NNW;
  } else {
    return CardinalDirection.N;
  }
}

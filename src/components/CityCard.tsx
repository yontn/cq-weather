import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { LocationWeatherFragment } from '../graphql/LocationWeather.graphql';
import { useStyles } from '../styles';
import degreeToCardinalDirection from '../utils/degreeToCardinalDirection';
import makeWeatherIconUrl from '../utils/makeWeatherIconUrl';
import mpsToKph from '../utils/mpsToKph';

const DEGREES = '°';
const CELSIUS = 'C';

export const CityCard = ({
  id,
  name,
  weather,
  actionHandler,
  actionText,
}: LocationWeatherFragment & {
  actionHandler: any;
  actionText?: string | null;
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardTitle}>
        <Typography variant='h5' component='h2'>
          {name}
        </Typography>
        <Avatar
          className={classes.avatar}
          src={makeWeatherIconUrl(weather?.summary?.icon)}
        />
      </CardContent>
      <CardContent className={classes.cardBody}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Current:
        </Typography>
        <Typography variant='body2' color='textPrimary' component='p'>
          {weather?.temperature?.actual?.toFixed()}
          {DEGREES}
          {CELSIUS}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          (feels like {weather?.temperature?.feelsLike?.toFixed()}
          {DEGREES}
          {CELSIUS})
        </Typography>
      </CardContent>
      <CardContent className={classes.cardBody}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Clouds:
        </Typography>
        <Typography
          variant='body2'
          color='textPrimary'
          component='p'
          className={classes.summaryDescription}
        >
          {weather?.summary?.description}
        </Typography>
      </CardContent>
      <CardContent className={classes.cardBody}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Temp:{' '}
        </Typography>
        <Typography variant='body2' color='textPrimary' component='p'>
          {weather?.temperature?.max?.toFixed()}
          {DEGREES} (max)
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {weather?.temperature?.min?.toFixed()}
          {DEGREES} (min)
        </Typography>
      </CardContent>
      <CardContent className={classes.cardBody}>
        <Typography variant='body2' color='textSecondary' component='p'>
          Wind:{' '}
        </Typography>
        <Typography variant='body2' color='textPrimary' component='p'>
          {mpsToKph(weather?.wind?.speed || 0)} {'km/h '}
          {degreeToCardinalDirection(weather?.wind?.deg || 0)}
        </Typography>
      </CardContent>
      {Boolean(actionHandler && actionText) && (
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => actionHandler(id, name)}
          >
            {actionText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

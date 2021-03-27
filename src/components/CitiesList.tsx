import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { REMOVE_FROM_LIST_TEXT } from '../consts';
import { useCitiesStore } from '../stores/CitiesStore';
import { useStyles } from '../styles';
import { useGetWeatherByLocationIdsQuery } from '../__generated__/src/graphql/GetWeatherByLocationIds.graphql-GetWeatherByLocationIds-LocationWeather';
import { CityCard } from './CityCard';
import { Loading } from './Loading';

export const CitiesList = observer(() => {
  const classes = useStyles();
  const { cities, removeFromCities, clearCities } = useCitiesStore();
  const ids = Array.from(cities.keys()).reverse();

  const { loading, error, data } = useGetWeatherByLocationIdsQuery({
    variables: { ids },
    skip: !ids.length,
  });

  if (loading && !data) return <Loading />;
  if (error) return <p>Error :{JSON.stringify(error)}</p>;

  return (
    <>
      <Box mb={2}>
        <Container className={classes.listTitle}>
          <Typography gutterBottom>
            <Grid container spacing={2}>
              <Grid item className={classes.listTitle}>
                <Typography variant='h4'>List</Typography>
              </Grid>
              {Array.from(cities.keys()).length > 0 && (
                <Grid item className={classes.listTitle}>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => clearCities()}
                  >
                    Remove All
                  </Button>
                </Grid>
              )}
            </Grid>
          </Typography>
        </Container>
      </Box>
      <Container className={classes.flexWrap}>
        <Grid container spacing={2}>
          {data?.items?.map((item) => (
            <Grid item>
              <CityCard
                key={item?.id}
                {...item}
                actionHandler={removeFromCities}
                actionText={REMOVE_FROM_LIST_TEXT}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
});

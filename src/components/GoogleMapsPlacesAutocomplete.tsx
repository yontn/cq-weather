import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';
import { GoogleMapsPlacesAutocompleteProps, PlaceType } from '../types';
import detailsResultToPlacePayload from '../utils/detailsResultToPlacePayload';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function GoogleMapsPlacesAutocomplete({
  onChange,
}: GoogleMapsPlacesAutocompleteProps) {
  const classes = useStyles();

  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
    },
    debounce: 100,
  });
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  return (
    <Autocomplete
      disabled={!ready}
      style={{ width: 345 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={data}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={async (event: any, newValue: PlaceType | null) => {
        const details = await getDetails({
          placeId: newValue?.place_id,
          fields: ['address_components', 'geometry', 'icon', 'name'],
        });
        onChange(detailsResultToPlacePayload(details));
        setValue('');
        clearSuggestions();
      }}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Add a location'
          variant='outlined'
          fullWidth
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant='body2' color='textSecondary'>
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

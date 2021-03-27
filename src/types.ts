export type AddressRecord = {
  short_name: string;
  long_name: string;
  types: string[];
};

export interface PlaceType {
  place_id: string;
  description: string;
  address_components: Array<AddressRecord>;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      }
    ];
  };
}

export type PlacePayload = {
  name: string;
  country: string;
};

export type GoogleMapsPlacesAutocompleteProps = {
  onChange: (value?: PlacePayload | null) => void;
};

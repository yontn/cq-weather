export default function detailsResultToPlacePayload(details: any) {
  return {
    name: details.address_components.find((adr: { types: string | string[] }) =>
      adr?.types.includes('locality')
    )?.short_name,
    country: details.address_components.find(
      (adr: { types: string | string[] }) => adr?.types.includes('country')
    )?.short_name,
  };
}

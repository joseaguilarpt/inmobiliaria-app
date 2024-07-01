export function parseQueryParams(searchParams: URLSearchParams) {
  const params = new URLSearchParams(searchParams);
  const queryParams: Record<string, string> = {};

  params.forEach((value, key) => {
    queryParams[key] = value;
  });
  return queryParams;
}

export const encodeSearch = (formData: any) => {
  const params: any = {
    operation: formData.operation,
    radius: "300",
  };
  if (formData.location?.lat && formData.location?.lon) {
    params.lat = formData.location.lat;
    params.lon = formData.location.lon;
  }
  if (formData.location?.display_name) {
    params.location = formData.location.display_name;
  }
  if (formData.area_from) {
    params.area_from = formData.area_from;
  }
  if (formData.area_to) {
    params.area_to = formData.area_to;
  }
  if (formData.category) {
    params.category = formData.category.id;
  }
  if (formData.price_from) {
    params.price_from = formData.price_from.id;
  }
  if (formData.price_to) {
    params.price_to = formData.price_to.id;
  }
  if (formData.rooms) {
    params.rooms = formData.rooms;
  }
  if (formData.bathrooms) {
    params.bathrooms = formData.bathrooms;
  }
  if (formData.description) {
    params.description = formData.description;
  }
  if (formData.amenities) {
    params.amenities = formData.amenities;
  }
  const url = new URLSearchParams("");
  // @ts-ignore
  Object.entries(params).forEach(([key, value]) => url.append(key, value));
  return url.toString();
};

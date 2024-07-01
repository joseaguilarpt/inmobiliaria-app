import { useMutation } from "@tanstack/react-query";
import AutoSuggest, { AutoSuggestProps } from "../AutoSuggest/AutoSuggest";
import { SEARCH_LOCATION, searchLocationQuery } from "~/api/queries";
import { queryClient } from "~/root";
import React from "react";
import lodash from "lodash";
import { getUserLocation } from "~/utils/userGeoLocations";
import { getItem, setItem } from "~/utils/localStorageUtils";
import { isOlderThanDate } from "~/utils/dateUtils";

export function InputSearchLocation({
  onChange,
  value,
  ...rest
}: AutoSuggestProps) {
  const parseDetails = (v: number) => {
switch (true) {
  case v >= 5 && v <= 9:
    return 'State';
  case v >= 10 && v <= 2:
    return 'Province';
  case v >= 13 && v <= 16:
    return 'City';
  case v >= 17 && v <= 18:
    return 'Town';
  case v === 19:
    return 'Village';
  case v === 20:
    return 'Neighborhood';
  default:
    return 'Address';
}
  }
  const [options, setOptions] = React.useState([]);
  const { mutate, isPending } = useMutation({
    mutationFn: (params: any) => {
      return queryClient.fetchQuery(searchLocationQuery({ params }));
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [SEARCH_LOCATION],
      });
      const result = data
        .filter((item: any) => item.place_rank > 4)
        .map((item: any) => ({
          ...item,
          id: item.place_id,
          label: item.display_name,
          details: parseDetails(item.place_rank)
        }));
      if (result.length) {
        setOptions(result);
      }
    },
    onError: () => {},
  });

  const handleSubmit = async (q: any) => {
    let params: { [key: string]: any } = { q, radius: 500, limit: 10 };
    try {
      const geo = getItem("geo");
      if (
        geo &&
        !isOlderThanDate(geo.timestamp, { time: 1, measure: "week" })
      ) {
        params = {
          ...params,
          latitude: geo.coords.latitude,
          longitude: geo.coords.longitude,
        };
      } else {
        const userGeo = await getUserLocation();
        params = {
          ...params,
          latitude: userGeo.coords.latitude,
          longitude: userGeo.coords.longitude,
        };
        setItem("geo", userGeo);
      }
    } finally {
      const url = new URLSearchParams("");
      Object.entries(params).forEach(([key, value]) => url.append(key, value));
      mutate(url);
    }
  };

  const debouncedHandleSubmit = lodash.debounce(handleSubmit, 1001);

  return (
    <AutoSuggest
      {...rest}
      value={value?.display_name}
      onChange={onChange}
      onQueryChange={debouncedHandleSubmit}
      isLoading={isPending}
      options={options}
    />
  );
}

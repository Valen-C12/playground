import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../util";
import { RouteSearchParams, RouteSearchResponse, SearchStatus } from "./type";

export const routeSearch = async (
  params: RouteSearchParams
): Promise<RouteSearchResponse> => {
  try {
    const res = axiosInstance.post("/retro/search-path", params);
    return (await res).data;
  } catch (e) {
    throw e;
  }
};

export const useRouteSearch = (
  params: RouteSearchParams
): { data: RouteSearchResponse | undefined; isLoading: boolean } => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => setCompleted(false), [params]);

  //Fetch until received status is finished
  const { isLoading, data } = useQuery(
    "routeSearch",
    () => routeSearch(params),
    {
      onSuccess: (data) => {
        if (data.status.status === "completed") {
          setCompleted(true);
        }
      },
      onError: (error) => {
        console.error(error);
        setCompleted(true);
      },
      enabled: !completed,
      refetchInterval: completed ? false : 1000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading };
};

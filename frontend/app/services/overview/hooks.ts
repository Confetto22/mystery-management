import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "./api";

export const useGetOverviewQuery = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverview,
  });
};

import apiClient from "~/lib/api-client";

export const fetchOverview = async () => {
  const response = await apiClient.get("/overview");
  return response.data;
};

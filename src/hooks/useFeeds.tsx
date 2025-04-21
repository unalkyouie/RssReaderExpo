import { useQuery } from "@tanstack/react-query";

import { fetchFeeds } from "~/api";

export const useFeeds = () => {
  return useQuery({
    queryKey: ["feeds"],
    queryFn: fetchFeeds,
  });
};

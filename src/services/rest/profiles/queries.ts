import { supabase } from "@/lib/supabase";
import { useQuery } from "react-query";

const getProfileData = async (filters, isCountTotal = false) => {
  const { range, sortBy, keywords, filter } = filters;
  const { start, end } = range;
  const { column, order } = sortBy;

  const query = supabase.from("profiles").select(
    `email, first_name, last_name, gender, roles (
        name
      )`,
    isCountTotal ? { count: "exact", head: true } : {}
  );

  if (!isCountTotal) {
    query.range(start, end);
  }

  if (column && order) {
    query.order(column, { ascending: order === "asc" });
  }

  if (keywords) {
    query.or(
      `email.ilike.%${keywords}%,first_name.ilike.%${keywords}%,last_name.ilike.%${keywords}%`
    );
  }

  if (filter?.roles?.length) {
    query.in("role_id", filter.roles);
  }

  if (filter?.gender?.length) {
    query.in("gender", filter.gender);
  }

  return await query;
};

const getProfileList = async (range, sortBy, keywords, filter) => {
  const filters = {
    range,
    sortBy,
    keywords,
    filter,
  };
  const total = await getProfileData(filters, true);
  const list = await getProfileData(filters);

  return { ...list, total: total?.count || 0 };
};

const getProfileTotal = async () => {
  return await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });
};

export const useGetProfileList = (range, sortBy, keywords, filter) =>
  useQuery({
    queryKey: ["profileList", range, sortBy, keywords, filter],
    queryFn: () => getProfileList(range, sortBy, keywords, filter),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

export const useGetProfileTotal = () =>
  useQuery({
    queryKey: ["profileTotal"],
    queryFn: getProfileTotal,
    refetchOnWindowFocus: false,
  });

import useDebounce from "@/hooks/useDebounce";
import { useGetProfileList } from "@/services/rest/profiles";
import { useGetRoleList } from "@/services/rest/roles";
import { capitalize } from "@mui/material";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type Person = {
  first_name: string;
};

const useUsersList = () => {
  const navigate = useNavigate();

  const [range, setRange] = useState({
    start: 0,
    end: 9,
  });

  const [sortBy, setSortBy] = useState({
    column: "",
    order: "asc",
  });

  const [filter, setFilter] = useState({});

  const [keywords, setKeywords] = useState("");

  const { data } = useGetProfileList(range, sortBy, keywords, filter);
  const { data: roleData, isLoading: isRoleListLoading } = useGetRoleList();

  const profileColumns = [
    {
      accessorKey: "roles.name",
      id: "roles(name)",
      header: () => "Roles",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "email",
      header: () => "Email",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "first_name",
      header: () => "First Name",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "last_name",
      header: () => "Last Name",
      footer: (props) => props.column.id,
      cell: (row) => row.getValue() ?? "-",
    },
    {
      accessorKey: "gender",
      header: () => "Gender",
      footer: (props) => props.column.id,
      cell: (row) => capitalize(row.getValue()),
    },
  ];

  //   const attributeSets = useMemo(() => {
  //   }, [profileList]);
  //   const { data: profileList } = data;
  const onPageChange = (start, end) => {
    setRange((prevState) => ({
      ...prevState,
      start,
      end,
    }));
  };

  const onSortBy = (column, order) => {
    setSortBy((prevState) => ({
      ...prevState,
      column,
      order,
    }));
  };

  const debounce = useDebounce((callback) => {
    callback();
  });

  const onSearch = (e) => {
    const value = e.target.value;
    debounce(() => {
      setKeywords(value);
    });
  };

  const onFilter = (e) => {
    const value = e.filters.map((filter) => filter.id);
    setFilter((prevState) => ({
      ...prevState,
      [e.column]: value,
    }));
  };

  return {
    data: {
      profileList: data?.data,
      profileTotal: data?.total,
      profileColumns,
      roleList: roleData?.data,
      isRoleListLoading,
    },
    methods: {
      navigate,
      onFilter,
      onPageChange,
      onSortBy,
      onSearch,
    },
  };
};

export default useUsersList;

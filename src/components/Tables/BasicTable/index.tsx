import { useMemo, useState } from "react";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { Edit, Delete, Visibility } from "@mui/icons-material";

import TablePagination from "@/components/Paginations/TablePagination";

import { Person } from "./fetchData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const BasicTable = (props) => {
  const { data, total, columns, onPageChange, onSortBy } = props;

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const pageCount = Math.ceil(total / pageSize);

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data ?? defaultData,
    columns: useMemo(() => columns, []),
    pageCount: pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const createSortHandler =
    (property) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property) => {
    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";
    const newOrder = isAsc ? "desc" : "asc";
    const selectedColumn = isDesc ? "" : property;

    setOrder(newOrder);
    setOrderBy(selectedColumn);
    onSortBy(selectedColumn, newOrder);
  };
  return (
    <div className="p-2">
      <div className="h-2" />
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <StyledTableRow key={headerGroup.id}>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={false}
                  checked={false}
                  onChange={() => {}}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </StyledTableCell>
              {headerGroup.headers.map((header) => {
                return (
                  <StyledTableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-4"
                  >
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : "asc"}
                      onClick={createSortHandler(header.id)}
                    ></TableSortLabel>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {orderBy === header.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </>
                    )}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableHead>
        <TableBody className="divide-y">
          {table.getRowModel().rows.map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <StyledTableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={false}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </StyledTableCell>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <StyledTableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell padding="checkbox">
                  <Stack direction="row">
                    <IconButton color="primary" size="small">
                      <Edit fontSize="inherit" />
                    </IconButton>
                    <IconButton color="warning" size="small">
                      <Visibility fontSize="inherit" />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="h-2" />
      <TablePagination
        totalData={total}
        setPageSize={(size) => {
          table.setPageSize(size);
          onPageChange(0, size - 1);
        }}
        setPageIndex={(page) => {
          const startRange = page * pageSize;
          const endRange = startRange + pageSize - 1;

          table.setPageIndex(page);
          onPageChange(startRange, endRange);
        }}
        pageCount={table.getPageCount()}
        pageSize={pageSize}
        pageIndex={table.getState().pagination.pageIndex}
      />
    </div>
  );
};

export default BasicTable;

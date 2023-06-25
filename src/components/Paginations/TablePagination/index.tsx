import {
  Box,
  TablePagination as MUITablePagination,
  Pagination,
} from "@mui/material";

const TablePagination = (props) => {
  const {
    totalData,
    pageSize,
    pageCount,
    pageIndex,
    setPageIndex,
    setPageSize,
  } = props;

  return (
    <>
      <MUITablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: totalData }]}
        component="div"
        count={totalData}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(_, page) => {
          setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          setPageSize(size);
        }}
        ActionsComponent={() => (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <Pagination
              count={pageCount}
              showFirstButton
              showLastButton
              page={pageIndex + 1}
              onChange={(_, page) => {
                setPageIndex(page - 1);
              }}
            />
          </Box>
        )}
      />
    </>
  );
};

export default TablePagination;

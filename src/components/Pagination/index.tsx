import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface SitePaginationProps {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  setPage: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const SitePagination: React.FC<SitePaginationProps> = ({ total, itemsPerPage, currentPage, setPage }) => {
  const totalPages = Math.ceil(total ? total / itemsPerPage : 0);
  return (
    <Stack spacing={2}>
      {totalPages > 0 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={setPage}
          color="standard"
          data-testid="pagination"
        />
      )}
    </Stack>
  );
};

export default SitePagination;

import {
  Alert,
  AlertTitle,
  Grid,
  Paper,
  Skeleton,
  Snackbar,
  Slide,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Tile from '../components/Tile';
import { AxiosError } from 'axios';
import ErrorIcon from '@mui/icons-material/Error'; // Import the Error icon from Material-UI
import useData from '../hooks/useData';
import { App } from '../services/appService';
import HeaderToolbar from '../common/Toolbar/HeaderToolbar';
import FormModal from '../common/FormModal';
import PaginationButtons from '../common/PaginationButtons';

interface Props {
  onSet: (id: string) => void;
  onSetName: (name: string) => void;
}

const Application = ({ onSet, onSetName }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [selectedAppId, setSelectedAppId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [toastError, setToastError] = useState<string>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [sort, setSort] = useState<string>('asc');
  const [sortby, setSortby] = useState<string>('name');
  const [previousPage, setPreviousPage] = useState<number | null>(null);

  //getting all apps
  const {
    data: apps,
    error,
    isLoading,
  } = useData(page, 'applications', undefined, searchInput, sort, sortby);

  useEffect(() => {
    onSet(selectedAppId);
  }, [selectedAppId, onSet]);

  const handlePageChange = (newPage: number) => {
    setPreviousPage(page);
    setPage(newPage);
  };

  const getSlideDirection = () => {
    if (previousPage === null) {
      return 'left'; // Initial render, slide from the left
    } else if (page > previousPage) {
      return 'left'; // Navigating to the next page, slide from the right
    } else {
      return 'right'; // Navigating to the previous page, slide from the left
    }
  };
  //functions to open and close the toast
  const onOpenToast = (err: AxiosError) => {
    setToastError(err?.response?.data);

    setOpen(true);
  };

  const onCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onEdit = () => setOpen(true);

  if (isLoading) {
    // Display skeleton placeholders when data is loading
    const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={index}
        display='grid'
        gridAutoFlow='column'
      >
        <Paper
          elevation={8}
          sx={{
            padding: 1,
            backgroundColor: '#EEEEEE',
            borderRadius: 4,
            display: 'flex',
            minHeight: '15vw',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '15vw',
          }}
        >
          <Skeleton animation='wave' variant='text' width='60%' />
          <Skeleton animation='wave' variant='text' width='80%' />
          <Skeleton animation='wave' variant='text' width='60%' />
          <Skeleton animation='wave' variant='text' width='80%' />
        </Paper>
      </Grid>
    ));

    return (
      <Grid container spacing={3}>
        {skeletonItems}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert
        iconMapping={{
          error: <ErrorIcon fontSize='large' />, // Customize the error icon size
        }}
        severity='error'
        variant='outlined'
        sx={{ marginTop: '20px' }}
      >
        <AlertTitle>Error</AlertTitle>
        Unable to Fetch Apps<strong> {error.message}</strong>
      </Alert>
    );
  }

  return (
    <>
      <HeaderToolbar
        title={'applications'.toUpperCase()}
        onSet={setSearchInput}
        setSort={setSort}
        setSortby={setSortby}
        setOpenAddModal={setOpenAddModal}
      />

      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 0.05,
          paddingLeft: '40px',
        }}
      >
        {apps?.applications?.length === 0 && (
          <Grid item xs={12}>
            <Alert severity='info' sx={{ marginTop: '20px' }}>
              No Items Found
            </Alert>
          </Grid>
        )}

        {apps?.applications?.map((app) => (
          <Slide
            direction={getSlideDirection()} // Dynamic slide direction
            in={true}
            mountOnEnter
            unmountOnExit
            key={app._id}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              display='grid'
              gridAutoFlow='column'
              key={app._id}
            >
              <Tile
                app={app}
                page={page}
                selectedApp={selectedAppId}
                setSelectedApp={setSelectedAppId}
                openToast={onOpenToast}
                open={open}
                closeToast={onCloseToast}
                toastError={toastError}
                onEdit={onEdit}
                onSetName={onSetName}
                setPage={setPage}
                finalPage={apps.pagination?.totalPages || 1}
              />
            </Grid>
          </Slide>
        ))}
        <PaginationButtons
          currentPage={page}
          totalPages={apps.pagination?.totalPages}
          setPage={handlePageChange}
        />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={onCloseToast}>
        <Alert onClose={onCloseToast} severity='error' sx={{ width: '100%' }}>
          {/* {error || "Something Went Wrong"} */}
        </Alert>
      </Snackbar>

      <FormModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title='Add'
        page={page}
        entityName='applications'
        finalPage={apps.pagination?.totalPages || 1}
      />
    </>
  );
};

export default Application;

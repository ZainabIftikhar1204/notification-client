import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Buttons from '../common/Buttons/Buttons';
import { AxiosError } from 'axios';
import { App } from '../services/appService';
import useModifyData from '../hooks/useModifyData';
// import './Tile.css';
import ReactCardFlip from 'react-card-flip';

interface Props {
  app: App;
  selectedApp: string | undefined;
  setSelectedApp: (app: string | undefined) => void;
  openToast: (err: AxiosError) => void;
  closeToast: () => void;
  open: boolean;
  toastError: string | undefined;
  page: number;
  onEdit: () => void;
  onSetName: (name: string) => void;
  setPage: (page: number) => void;
  finalPage: number;
}

const Tile = ({
  app,
  selectedApp,
  setSelectedApp,
  open,
  openToast,
  closeToast,
  page,
  toastError,
  onSetName,
  setPage,
  finalPage,
}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    // Automatically flip the card back after 1 second
    setTimeout(() => {
      setIsFlipped(false);
    }, 5000); // Adjust the duration (in milliseconds) as needed
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
        <Card
          className='front-card'
          elevation={12}
          sx={{
            padding: 1,
            backgroundColor: '#EEEEEE',
            borderRadius: 4,
            display: 'flex',
            minHeight: '15vw',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
            border: selectedApp === app._id ? '3px solid #2196F3' : 'none',
            '&:hover': {
              border: '3px solid #2196F3',
            },
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => {
            setSelectedApp(app._id);
            onSetName(app.name);
          }}
        >
          {/* Front side */}
          <CardContent
            sx={{
              flex: 1,
              display: 'flex',
              textAlign: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFlip();
              }}
            >
              Info
            </Button>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: '#303030',
              }}
              style={{
                fontWeight: selectedApp === app._id ? 'bold' : 'normal',
                fontSize: selectedApp === app._id ? '1.7rem' : '1.5rem',
              }}
            >
              {app.name.toUpperCase()}
            </Typography>
            <hr
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#303030',
              }}
            />

            <Typography variant='body1'>
              {app.description && app.description?.length > 100
                ? app.description?.substring(0, 100) + '...'
                : app.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Buttons
              selectedEntity={app}
              isActive={app.is_active}
              openToast={openToast}
              closeToast={closeToast}
              open={open}
              page={page}
              error={toastError}
              entity='applications'
              setPage={setPage}
              finalPage={finalPage}
              setSelectedApp={setSelectedApp}
            />
          </CardActions>
        </Card>
        {/* Back side */}
        <Card
          className='back-card'
          elevation={12}
          sx={{
            padding: 1,
            backgroundColor: '#EEEEEE',
            borderRadius: 4,
            display: 'flex',
            minHeight: '15vw',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
            border: selectedApp === app._id ? '3px solid #2196F3' : 'none',
            '&:hover': {
              border: '3px solid #2196F3',
            },
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => {
            setSelectedApp(app._id);
            onSetName(app.name);
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: 'flex',
              textAlign: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFlip();
              }}
            >
              Back
            </Button>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: '#303030',
              }}
            >
              DESCRIPTION
            </Typography>
            <hr
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#303030',
              }}
            />

            <Typography variant='body1'>{app.description}</Typography>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '40px',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{ color: '#777', paddingRight: '50px' }}
                >
                  <em>Created At: </em>
                  {app.created_at ? app.created_at.slice(0, 10) : '-'}
                </Typography>

                <Typography variant='caption' sx={{ color: '#777' }}>
                  <em>Updated At: </em>
                  {app.updated_at ? app.updated_at.slice(0, 10) : '-'}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  );
};

export default Tile;

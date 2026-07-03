import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loading: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  return (
        isLoading ? <Backdrop open={isLoading} sx={{ backdropFilter: 'blur(12px)', color: 'text.primary', zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <Paper sx={{ width: 'min(360px, calc(100vw - 32px))', p: 3, borderRadius: 4, backgroundColor: 'background.paper' }}>
            <Stack spacing={2}>
              <Skeleton variant="circular" width={52} height={52} />
              <Stack spacing={1}>
                <Skeleton variant="text" width="68%" height={28} />
                <Skeleton variant="text" width="84%" height={18} />
                <Skeleton variant="text" width="48%" height={18} />
              </Stack>
              <LinearProgress />
              <Typography variant="caption" color="text.secondary">
                Loading the workspace
              </Typography>
            </Stack>
          </Paper>
      </Backdrop> : null
  );
};

export default Loading;

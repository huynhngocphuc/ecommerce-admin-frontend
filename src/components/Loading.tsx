import { Roofing } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loading: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);


  return (
      <Backdrop open={isLoading} >
        <CircularProgress size="3rem" />
      </Backdrop>
  );
};

export default Loading;

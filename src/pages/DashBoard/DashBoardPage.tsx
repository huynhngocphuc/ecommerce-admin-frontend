import {
  Box,
  Container,
  Typography
} from '@mui/material';




const DashBoardPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>

      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Chào mừng bạn quay trở lại! Đây là tổng quan về cửa hàng của bạn.
        </Typography>
      </Box>




    </Container>
  );
};

export default DashBoardPage;
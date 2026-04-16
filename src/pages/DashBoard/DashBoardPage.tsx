import {
  Box,
  Container,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';




const DashBoardPage = () => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>

      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {tr('dashboard.title')}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {tr('dashboard.welcome')}
        </Typography>
      </Box>




    </Container>
  );
};

export default DashBoardPage;
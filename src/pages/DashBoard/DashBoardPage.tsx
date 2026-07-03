import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DashBoardPage = () => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Catalog review',
      body: 'Start with product drafts, prices, and image checks.',
      action: 'Open products',
      onClick: () => navigate('/products'),
    },
    {
      title: 'Operations handoff',
      body: 'Keep product updates, alerts, and language settings in one place.',
      action: 'Check alerts',
      onClick: () => navigate('/products'),
    },
    {
      title: 'Layout health',
      body: 'The shell now uses a calmer surface, tighter hierarchy, and clearer actions.',
      action: 'Review shell',
      onClick: () => navigate('/products'),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
            <Box sx={{ maxWidth: 720 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.18em' }}>
                operations hub
              </Typography>
              <Typography variant="h3" component="h1" sx={{ mt: 1 }}>
                {tr('dashboard.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: '62ch' }}>
                {tr('dashboard.welcome')}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/products')}>
                Open products
              </Button>
              <Button variant="outlined" onClick={() => navigate('/products')}>
                Review catalog
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {cards.map((card) => (
            <Paper key={card.title} sx={{ p: 2.5, borderRadius: 2, minHeight: 220, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={1.5} sx={{ height: '100%' }}>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {card.body}
                </Typography>
                <Button variant="text" onClick={card.onClick} sx={{ alignSelf: 'flex-start', px: 0 }}>
                  {card.action}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default DashBoardPage;
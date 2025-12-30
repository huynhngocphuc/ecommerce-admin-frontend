import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Container,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  Inventory,
  People,
  AttachMoney,
  Notifications,
} from '@mui/icons-material';

// Component cho thẻ thống kê
const StatCard = ({ title, value, icon, color, trend }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}) => (
  <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {value}
          </Typography>
          {trend && (
            <Typography 
              variant="body2" 
              color={trend.startsWith('+') ? 'success.main' : 'error.main'}
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
              {trend}
            </Typography>
          )}
        </Box>
        <Avatar 
          sx={{ 
            bgcolor: color, 
            width: 56, 
            height: 56,
            position: 'absolute',
            top: -10,
            right: 20,
            boxShadow: 3
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

// Component cho bảng đơn hàng gần đây
const RecentOrders = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Đơn hàng gần đây
      </Typography>
      <Box>
        {[
          { id: '#12345', customer: 'Nguyễn Văn A', amount: '2,500,000đ', status: 'Đang xử lý' },
          { id: '#12346', customer: 'Trần Thị B', amount: '1,200,000đ', status: 'Đã giao' },
          { id: '#12347', customer: 'Lê Văn C', amount: '850,000đ', status: 'Chờ thanh toán' },
        ].map((order, index) => (
          <Box 
            key={index}
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            py={1.5}
            borderBottom={index < 2 ? 1 : 0}
            borderColor="divider"
          >
            <Box>
              <Typography variant="body1" fontWeight="medium">
                {order.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {order.customer}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="body1" fontWeight="bold">
                {order.amount}
              </Typography>
              <Typography 
                variant="body2" 
                color={
                  order.status === 'Đã giao' ? 'success.main' : 
                  order.status === 'Đang xử lý' ? 'warning.main' : 'error.main'
                }
              >
                {order.status}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);


const LowStockProducts = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Sản phẩm sắp hết hàng
      </Typography>
      <Box>
        {[
          { name: 'iPhone 14 Pro', stock: 5 },
          { name: 'Samsung Galaxy S23', stock: 3 },
          { name: 'MacBook Air M2', stock: 2 },
        ].map((product, index) => (
          <Box 
            key={index}
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            py={1.5}
            borderBottom={index < 2 ? 1 : 0}
            borderColor="divider"
          >
            <Typography variant="body1">
              {product.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="error.main"
              fontWeight="bold"
            >
              Còn {product.stock}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

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

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Doanh thu hôm nay"
            value="15,250,000đ"
            icon={<AttachMoney />}
            color="#1976d2"
            trend="+12.5%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Đơn hàng mới"
            value="24"
            icon={<ShoppingCart />}
            color="#2e7d32"
            trend="+8.2%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Sản phẩm trong kho"
            value="1,234"
            icon={<Inventory />}
            color="#ed6c02"
            trend="-2.1%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Khách hàng mới"
            value="89"
            icon={<People />}
            color="#9c27b0"
            trend="+15.3%"
          />
        </Grid>
      </Grid>



    </Container>
  );
};

export default DashBoardPage;
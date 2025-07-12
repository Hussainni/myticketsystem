import React from 'react';
import { Container, Grid, Typography, Box, Stack, Card, CardContent, Button } from '@mui/material';
import { JumboCard } from '@jumbo/components';
import { LastMonthSales } from '@app/_components/widgets/LastMonthSales';
import { OnlineSignupsFilled } from '@app/_components/widgets/OnlineSignupsFilled';
import { NewVisitorsThisMonth } from '@app/_components/widgets/NewVisitorsThisMonth';
import { TotalRevenueThisYear } from '@app/_components/widgets/TotalRevenueThisYear';
import { 
  ObjectCountOrders, 
  ObjectCountRevenue, 
  ObjectCountVisits, 
  ObjectCountQueries 
} from '@app/_components/metrics/ObjectCountCards';
import { RecentActivities } from '@app/_components/widgets/RecentActivities';
import { LatestNotifications } from '@app/_components/widgets/LatestNotifications';
import { NewAuthors } from '@app/_components/widgets/NewAuthors';
import { NewSubscribers } from '@app/_components/widgets/NewSubscribers';
import { CONTAINER_MAX_WIDTH } from '@app/_config/layouts';
import { 
  TrendingUp, 
  People, 
  ShoppingCart, 
  Analytics, 
  Notifications, 
  Settings,
  Add,
  Assignment,
  Assessment
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const NewPage = () => {
  const { t } = useTranslation();

  const quickActions = [
    { title: 'Add New User', icon: <Add />, color: 'primary.main' },
    { title: 'Create Report', icon: <Assessment />, color: 'success.main' },
    { title: 'View Analytics', icon: <Analytics />, color: 'info.main' },
    { title: 'Manage Tasks', icon: <Assignment />, color: 'warning.main' },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: 'flex',
        minWidth: 0,
        flex: 1,
        flexDirection: 'column',
      }}
      disableGutters
    >
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your key metrics and recent activities
        </Typography>
      </Box>

      {/* Main Stats Cards */}
      <Grid container spacing={3.75} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <LastMonthSales subheader="Last Month Sales" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OnlineSignupsFilled subheader="Online Signups" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <NewVisitorsThisMonth subheader="New Visitors" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalRevenueThisYear subheader="Total Revenue" />
        </Grid>
      </Grid>

      {/* Secondary Stats Cards */}
      <Grid container spacing={3.75} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <ObjectCountOrders vertical={true} subTitle="Orders This Year" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ObjectCountRevenue vertical={true} subTitle="Revenue This Year" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ObjectCountVisits vertical={true} subTitle="Total Visits" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <ObjectCountQueries vertical={true} subTitle="Queries This Year" />
        </Grid>
      </Grid>

      {/* Content Section */}
      <Grid container spacing={3.75}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Quick Actions */}
          <JumboCard
            title="Quick Actions"
            subheader="Common tasks and shortcuts"
            sx={{ mb: 3 }}
          >
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 2, 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <Box sx={{ color: action.color, mb: 1 }}>
                      {action.icon}
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {action.title}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </JumboCard>

          {/* Recent Activities */}
          <JumboCard
            title="Recent Activities"
            subheader="Latest user activities and system events"
            sx={{ mb: 3 }}
          >
            <RecentActivities />
          </JumboCard>

          {/* Additional Widgets */}
          <Grid container spacing={3.75}>
            <Grid item xs={12} md={6}>
              <NewAuthors subheader="New authors this month" />
            </Grid>
            <Grid item xs={12} md={6}>
              <NewSubscribers subheader="New subscribers this month" />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Latest Notifications */}
          <JumboCard
            title="Latest Notifications"
            subheader="Recent system notifications"
            sx={{ mb: 3 }}
          >
            <LatestNotifications />
          </JumboCard>

          {/* System Status */}
          <JumboCard
            title="System Status"
            subheader="Current system health and performance"
          >
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Server Status</Typography>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main' 
                }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Database</Typography>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main' 
                }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">API Services</Typography>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main' 
                }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Security</Typography>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: 'success.main' 
                }} />
              </Box>
            </Stack>
          </JumboCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPage;
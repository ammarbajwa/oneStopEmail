import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  LocalOffer as PromotionIcon,
  Warning as SpamIcon,
} from '@mui/icons-material';
import EmailList from '../components/EmailList';
import EmailDetail from '../components/EmailDetail';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeOption } from '../theme/themes';

interface HomeProps {
  currentTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
}

export default function Home({ currentTheme, onThemeChange }: HomeProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const theme = useTheme();

  const categories = [
    { id: 'inbox', name: 'Inbox', icon: <InboxIcon /> },
    { id: 'work', name: 'Work', icon: <WorkIcon /> },
    { id: 'personal', name: 'Personal', icon: <PersonIcon /> },
    { id: 'promotions', name: 'Promotions', icon: <PromotionIcon /> },
    { id: 'spam', name: 'Spam', icon: <SpamIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="primary" noWrap component="div" sx={{ flexGrow: 1 }}>
            AI Email Agent
          </Typography>
          <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'background.paper',
            boxShadow: theme => `0 0 20px ${alpha(theme.palette.primary.main, 0.08)}`,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  mb: 1,
                  '&.Mui-selected': {
                    bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      bgcolor: theme => alpha(theme.palette.primary.main, 0.12),
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>{category.icon}</ListItemIcon>
                <ListItemText 
                  primary={category.name}
                  primaryTypographyProps={{
                    fontWeight: selectedCategory === category.id ? 600 : 400,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <List>
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>{category.icon}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - 280px)` },
          mt: 8,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              elevation={0}
              sx={{
                height: 'calc(100vh - 100px)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <EmailList category={selectedCategory} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Paper
              elevation={0}
              sx={{
                height: 'calc(100vh - 100px)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <EmailDetail />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

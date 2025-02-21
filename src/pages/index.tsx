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

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DrawerContentProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

function DrawerContent({ categories, selectedCategory, onCategorySelect }: DrawerContentProps) {
  return (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category.id}
            selected={category.id === selectedCategory}
            onClick={() => onCategorySelect(category.id)}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              {category.icon}
            </ListItemIcon>
            <ListItemText 
              primary={category.name}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: category.id === selectedCategory ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

interface HomeProps {
  currentTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
}

export default function Home({ currentTheme, onThemeChange }: HomeProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const theme = useTheme();

  const categories = [
    { id: 'inbox', name: 'Inbox', icon: <InboxIcon /> },
    { id: 'work', name: 'Work', icon: <WorkIcon /> },
    { id: 'personal', name: 'Personal', icon: <PersonIcon /> },
    { id: 'promotions', name: 'Promotions', icon: <PromotionIcon /> },
    { id: 'spam', name: 'Spam', icon: <SpamIcon /> },
  ];

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmailId(emailId);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme => theme.zIndex.drawer + 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="primary"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              AI Email Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Smart email categorization & AI-powered responses
            </Typography>
          </Box>
          <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
          },
        }}
      >
        <DrawerContent categories={categories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      </Drawer>

      {/* Hover Drawer */}
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 20,
          zIndex: theme => theme.zIndex.drawer + 1,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Drawer
          variant="permanent"
          open={isHovering}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: isHovering ? 280 : 20,
              transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              bgcolor: 'background.paper',
              borderRight: 'none',
              boxShadow: isHovering ? theme => `0 0 20px ${alpha(theme.palette.primary.main, 0.08)}` : 'none',
            },
          }}
        >
          <Toolbar />
          {isHovering && (
            <DrawerContent categories={categories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
          )}
        </Drawer>
      </Box>

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
              <EmailList category={selectedCategory} onEmailSelect={handleEmailSelect} />
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
              {selectedEmailId ? (
                <EmailDetail emailId={selectedEmailId} />
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%'
                }}>
                  Select an email to view details
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

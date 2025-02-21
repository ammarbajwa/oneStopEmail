import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ThemeOption } from '../theme/themes';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  gap: 8,
  padding: 4,
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: theme.shape.borderRadius - 2,
    padding: '4px 12px',
    textTransform: 'capitalize',
    fontWeight: 500,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

interface ThemeSwitcherProps {
  currentTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newTheme: ThemeOption | null) => {
    if (newTheme !== null) {
      onThemeChange(newTheme);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <StyledToggleButtonGroup
        value={currentTheme}
        exclusive
        onChange={handleChange}
        aria-label="theme selection"
      >
        <ToggleButton value="blue" aria-label="blue theme">
          Blue
        </ToggleButton>
        <ToggleButton value="green" aria-label="green theme">
          Green
        </ToggleButton>
        <ToggleButton value="black" aria-label="black theme">
          Black
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}

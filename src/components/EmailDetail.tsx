import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Stack,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Send as SendIcon,
  Edit as EditIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

export default function EmailDetail() {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ 
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight="600">
            Project Update
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main' }}>J</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                john@example.com
              </Typography>
            </Box>
            <Chip
              label="Work"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <ReplyIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <ArchiveIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
        <Typography paragraph>
          Here are the latest updates on the project. We've made significant progress
          on the key deliverables and I'd like to schedule a review meeting to discuss
          the next steps.
        </Typography>

        <Typography paragraph>
          The team has completed the following items:
          - Frontend implementation of the dashboard
          - Backend API integration
          - Initial user testing
          
          We should review these items and plan the next sprint.
        </Typography>

        <Box sx={{ 
          mt: 4,
          p: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          borderRadius: 2,
        }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="600">
              AI-Suggested Response
            </Typography>
            <Chip
              label="Professional"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: 'success.main',
                fontWeight: 500,
              }}
            />
          </Stack>

          <TextField
            fullWidth
            multiline
            rows={4}
            defaultValue="Thank you for the comprehensive project update. I'm pleased to hear about the progress made on the key deliverables. I would be happy to schedule a review meeting to discuss the completed items and plan our next sprint. I'm available tomorrow afternoon between 2-4 PM or Thursday morning between 9-11 AM. Please let me know which time works best for you and I'll send out a calendar invite."
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
              },
            }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Edit Response
            </Button>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Send Response
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

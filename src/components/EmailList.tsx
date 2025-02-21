import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
  useTheme,
  alpha,
} from '@mui/material';

interface EmailListProps {
  category: string;
}

export default function EmailList({ category }: EmailListProps) {
  const theme = useTheme();
  
  // This is a placeholder for email data
  // In the real implementation, this will be fetched from the backend
  const emails = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Project Update',
      preview: 'Here are the latest updates on the project...',
      timestamp: '10:30 AM',
      unread: true,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      subject: 'Meeting Tomorrow',
      preview: 'Can we schedule a meeting to discuss...',
      timestamp: '9:15 AM',
      unread: false,
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      subject: 'Design Review',
      preview: "I've reviewed the latest designs and have some feedback...",
      timestamp: '8:45 AM',
      unread: true,
    },
  ];

  return (
    <>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" color="primary" fontWeight="600">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Typography>
      </Box>
      <List sx={{ 
        overflow: 'auto',
        height: '100%',
        '& .MuiListItem-root': {
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          },
        },
      }}>
        {emails.map((email, index) => (
          <div key={email.id}>
            <ListItem
              button
              sx={{
                px: 2,
                py: 1.5,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: email.unread ? 'primary.main' : 'grey.300',
                    color: email.unread ? 'primary.contrastText' : 'grey.700',
                  }}
                >
                  {email.sender[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: email.unread ? 600 : 400,
                        color: email.unread ? 'text.primary' : 'text.secondary',
                      }}
                    >
                      {email.subject}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: email.unread ? 'primary.main' : 'text.secondary',
                        fontWeight: email.unread ? 600 : 400,
                      }}
                    >
                      {email.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: email.unread ? 'text.primary' : 'text.secondary',
                        fontWeight: email.unread ? 500 : 400,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          fontWeight: email.unread ? 600 : 500,
                          color: email.unread ? 'text.primary' : 'text.secondary',
                          mr: 1,
                        }}
                      >
                        {email.sender}
                      </Typography>
                      {email.preview}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < emails.length - 1 && (
              <Divider
                variant="inset"
                component="li"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                }}
              />
            )}
          </div>
        ))}
      </List>
    </>
  );
}

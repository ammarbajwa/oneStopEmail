import { useEffect, useState } from 'react';
import { emailService, Email } from '../services/api';
import { Box, List, ListItem, Typography, CircularProgress, Alert } from '@mui/material';

interface EmailListProps {
  category: string;
  onEmailSelect: (emailId: string) => void;
}

export default function EmailList({ category, onEmailSelect }: EmailListProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const data = await emailService.getEmails(category);
        setEmails(data);
      } catch (err) {
        setError('Failed to fetch emails');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [category]);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {emails.map((email) => (
        <ListItem 
          key={email.id} 
          onClick={() => onEmailSelect(email.id)}
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <Box>
            <Typography variant="h6">{email.subject}</Typography>
            <Typography color="text.secondary">From: {email.sender}</Typography>
            <Typography noWrap>{email.preview}</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
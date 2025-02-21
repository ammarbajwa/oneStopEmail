import { useEffect, useState } from 'react';
import { emailService, EmailDetail as IEmailDetail } from '../services/api';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert,
  Paper,
  Divider 
} from '@mui/material';

interface Props {
  emailId: string;
}

export default function EmailDetail({ emailId }: Props) {
  const [email, setEmail] = useState<IEmailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchEmailDetail = async () => {
      try {
        const data = await emailService.getEmailDetail(emailId);
        setEmail(data);
      } catch (err) {
        setError('Failed to fetch email details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailDetail();
  }, [emailId]);

  const handleGenerateResponse = async () => {
    if (!email) return;
    
    setGenerating(true);
    try {
      const { response } = await emailService.generateResponse(emailId);
      setEmail(prev => prev ? { ...prev, aiResponse: response } : null);
    } catch (err) {
      console.error('Failed to generate response:', err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!email) return <Alert severity="info">Email not found</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>{email.subject}</Typography>
      <Typography color="text.secondary" gutterBottom>From: {email.sender}</Typography>
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ my: 3 }}>
        <Typography>{email.body}</Typography>
      </Box>

      {email.aiResponse ? (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>AI Generated Response:</Typography>
          <Typography>{email.aiResponse}</Typography>
        </Box>
      ) : (
        <Button 
          variant="contained" 
          onClick={handleGenerateResponse}
          disabled={generating}
        >
          {generating ? <CircularProgress size={24} /> : 'Generate AI Response'}
        </Button>
      )}
    </Paper>
  );
}
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  category: string;
  isRead: boolean;
}

export interface EmailDetail extends Email {
  body: string;
  aiResponse?: string;
}

export interface UserPreferences {
  theme?: string;
  emailsPerPage?: number;
}

const emailService = {
  getEmails: async (category: string, page = 1, limit = 20): Promise<Email[]> => {
    const response = await api.get(`/emails/category/${category}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getEmailDetail: async (emailId: string): Promise<EmailDetail> => {
    const response = await api.get(`/emails/detail/${emailId}`);
    return response.data;
  },

  updateCategory: async (emailId: string, category: string): Promise<void> => {
    await api.put(`/emails/${emailId}/categorize`, { category });
  },

  generateResponse: async (emailId: string): Promise<{ response: string }> => {
    const response = await api.post(`/emails/${emailId}/generate-response`);
    return response.data;
  },

  sendResponse: async (emailId: string, responseText: string): Promise<void> => {
    await api.post(`/emails/${emailId}/send`, { response: responseText });
  },
};

const userService = {
  getPreferences: async (): Promise<UserPreferences> => {
    const response = await api.get('/user/preferences');
    return response.data;
  },

  updatePreferences: async (preferences: UserPreferences): Promise<void> => {
    await api.put('/user/preferences', preferences);
  },
};

export { emailService, userService };
import axiosInstance from '../utils/axiosInstance';

export const eegService = {
  async getLatestAnalysis() {
    try {
      const response = await axiosInstance.get('/eeg/latest');
      return response.data;
    } catch (error) {
      console.error("Error getting latest EEG analysis:", error);
      throw error;
    }
  },

  async uploadEegData(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axiosInstance.post('/eeg/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading EEG data:", error);
      throw error;
    }
  }
};

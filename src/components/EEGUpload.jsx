import React, { useState } from 'react';
import { getToken } from '../utils/cookieUtils';
import { toast } from 'react-toastify';

const EEGUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a CSV file first.');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      toast.error('Only .csv files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/eeg/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${getToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Upload failed');
      }

      toast.success('EEG data uploaded successfully. Waiting for analysis...');
      setFile(null); // Reset
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error(error.message || 'Failed to upload EEG data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-teal-100 dark:border-teal-900/50 flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Upload Emotiv EEG Data</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
        Upload your exported .csv file from the Emotiv Insight 2 headset to generate real-time AI analysis.
      </p>
      
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500 dark:text-slate-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-teal-50 file:text-teal-700
          hover:file:bg-teal-100
          dark:file:bg-teal-900/50 dark:file:text-teal-400
          dark:hover:file:bg-teal-900/80 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`mt-2 w-full py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-md ${
          loading || !file 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-teal-600 to-cyan-500 hover:shadow-lg hover:-translate-y-0.5'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          'Upload Data'
        )}
      </button>
    </div>
  );
};

export default EEGUpload;

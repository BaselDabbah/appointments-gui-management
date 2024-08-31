export const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      alert(`Error: ${error.response.data.message || 'An error occurred'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
      alert('Error: No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Message:', error.message);
      alert(`Error: ${error.message}`);
    }
  };
  
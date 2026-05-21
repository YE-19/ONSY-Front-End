const axios = require('axios');

async function run() {
  try {
    const signin = await axios.post('https://onsy-backend.vercel.app/auth/signin', {
      email: 'testuser999@onsy.com',
      password: 'Password@123'
    });

    const token = signin.data?.data?.access_token;
    if (token) {
      console.log("Got token. Sending AI message...");
      const aiRes = await axios.post('https://onsy-backend.vercel.app/ai/send-message', {
        message: 'Hello'
      }, {
        headers: { Authorization: `bearer ${token}` }
      });
      console.log("AI Response:", aiRes.data);
    }
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
  }
}
run();

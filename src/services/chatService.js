// src/services/chatService.js

//هنحط اللينك بتاع api هنا

const API_URL = "https://api.onsy.com/v1/chat"; 

export const chatService = {
  async sendMessage(text) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // إذا كان المشروع يتطلب token من authService
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in chatService:", error);
      throw error;
    }
  }
};
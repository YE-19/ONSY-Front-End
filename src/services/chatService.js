// src/services/chatService.js

import { getToken } from '../utils/cookieUtils';

const API_URL = "https://api.onsy.com/v1/chat";

export const chatService = {
  async sendMessage(text) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
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
import axiosInstance from '../utils/axiosInstance';

/**
 * GET /user/profile
 * Fetches the authenticated user's profile data.
 */
export const getProfile = async () => {
  const response = await axiosInstance.get('/user/profile');
  return response.data;
};

/**
 * PUT /user/profile
 * Updates profile fields: firstName, lastName, gender, age
 */
export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/user/profile', profileData);
  return response.data;
};

/**
 * PATCH /user/password
 * Changes the user's password.
 * @param {{ oldPassword: string, newPassword: string, confirmPassword: string }} passwordData
 */
export const changePassword = async (passwordData) => {
  const response = await axiosInstance.patch('/user/password', passwordData);
  return response.data;
};

/**
 * DELETE /user/account
 * Permanently deletes the authenticated user's account.
 */
export const deleteAccount = async () => {
  const response = await axiosInstance.delete('/user/account');
  return response.data;
};

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

interface RefreshTokenResponse {
  token: string;
}

export const refreshAccessToken = async (refreshToken: string | null): Promise<string | null> => {
  if (!refreshToken) return null;
  
  try {
    const response = await axios.post<RefreshTokenResponse>(`${API_URL}/refresh-token`, { 
      refreshToken 
    });
    const { token } = response.data;
    return token;
  } catch (error: any) {
    console.error("Failed to refresh token:", error?.response?.data?.message || error.message);
    return null;
  }
};

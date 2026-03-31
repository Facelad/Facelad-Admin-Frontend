import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_AUTH;

export const AuthService = {
  // Login de usuario
  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await axios.post<{ token: string }>(
      `${API_AUTH}/auth/login`,
      { email, password }
    );
    return response.data;
  },

  // Registro de usuario
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    const response = await axios.post(`${API_AUTH}/auth/register`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role: "admin",
    });
    return response.data;
  },
};

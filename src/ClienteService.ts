import axios from "axios";
import { Cliente } from "./type"; // ruta correcta a src/type.ts

const API_CORE = import.meta.env.VITE_API_CORE;

export const ClienteService = {
  async getClientes(): Promise<Cliente[]> {
    const response = await axios.get<Cliente[]>(`${API_CORE}/clients`);
    return response.data;
  },

  async createCliente(cliente: Omit<Cliente, "id" | "estado">): Promise<Cliente> {
    const response = await axios.post<Cliente>(`${API_CORE}/clients`, cliente);
    return response.data;
  },

  async updateCliente(id: string, cliente: Partial<Cliente>): Promise<Cliente> {
    const response = await axios.put<Cliente>(`${API_CORE}/clients/${id}`, cliente);
    return response.data;
  },

  async deleteCliente(id: string): Promise<void> {
    await axios.delete(`${API_CORE}/clients/${id}`);
  },
};

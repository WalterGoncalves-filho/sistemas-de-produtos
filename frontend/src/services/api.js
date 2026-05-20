import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

export const getProdutos = () => api.get('/produtos')
export const getProduto = (id) => api.get(`/produtos/${id}`)
export const createProduto = (data) => api.post('/produtos', data)
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data)
export const deleteProduto = (id) => api.delete(`/produtos/${id}`)

import { useState, useEffect } from 'react'

const toMask = (value) => {
  const digits = String(value).replace(/\D/g, '').replace(/^0+/, '') || '0'
  const padded = digits.padStart(3, '0')
  const cents = padded.slice(-2)
  const reais = padded.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${reais},${cents}`
}

const fromMask = (masked) => parseFloat(masked.replace(/\./g, '').replace(',', '.')) || 0

export default function ProdutoModal({ produto, onSave, onClose }) {
  const [form, setForm] = useState({ nome: '', preco: '0,00', estoque: '' })

  useEffect(() => {
    if (produto) setForm({ nome: produto.nome, preco: toMask(Math.round(produto.preco * 100)), estoque: produto.estoque })
  }, [produto])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'preco') return setForm({ ...form, preco: toMask(value) })
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, preco: fromMask(form.preco), estoque: parseInt(form.estoque) })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          {produto ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nome do produto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
            <input
              name="preco"
              type="text"
              inputMode="numeric"
              value={form.preco}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0,00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
            <input
              name="estoque"
              type="number"
              min="0"
              value={form.estoque}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

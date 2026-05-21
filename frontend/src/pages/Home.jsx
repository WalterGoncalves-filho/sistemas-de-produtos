import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ProdutoTable from '../components/ProdutoTable'
import ProdutoModal from '../components/ProdutoModal'
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../services/api'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  const carregar = async () => {
    try {
      const { data } = await getProdutos()
      setProdutos(Array.isArray(data) ? data : [])
    } catch {
      Swal.fire('Erro', 'Não foi possível carregar os produtos.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregar() }, [])

  const abrirNovo = () => { setProdutoSelecionado(null); setModalOpen(true) }
  const abrirEdicao = (p) => { setProdutoSelecionado(p); setModalOpen(true) }

  const salvar = async (dados) => {
    try {
      if (produtoSelecionado) {
        await updateProduto(produtoSelecionado.id, dados)
        Swal.fire({ icon: 'success', title: 'Produto atualizado!', timer: 1500, showConfirmButton: false })
      } else {
        await createProduto(dados)
        Swal.fire({ icon: 'success', title: 'Produto cadastrado!', timer: 1500, showConfirmButton: false })
      }
      setModalOpen(false)
      carregar()
    } catch {
      Swal.fire('Erro', 'Não foi possível salvar o produto.', 'error')
    }
  }

  const excluir = async (p) => {
    const result = await Swal.fire({
      title: `Excluir "${p.nome}"?`,
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir',
    })
    if (!result.isConfirmed) return
    try {
      await deleteProduto(p.id)
      Swal.fire({ icon: 'success', title: 'Produto removido!', timer: 1500, showConfirmButton: false })
      carregar()
    } catch {
      Swal.fire('Erro', 'Não foi possível remover o produto.', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-indigo-600 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <h1 className="text-white text-xl font-bold tracking-wide">Sistema de Produtos</h1>
          </div>
          <span className="text-indigo-200 text-sm">EQP-3 · FAMETRO</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Cabeçalho da seção */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>
            <p className="text-gray-500 text-sm mt-1">
              {produtos.length} produto{produtos.length !== 1 ? 's' : ''} cadastrado{produtos.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={abrirNovo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition flex items-center gap-2"
          >
            <span className="text-lg">+</span> Novo Produto
          </button>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ProdutoTable produtos={produtos} onEdit={abrirEdicao} onDelete={excluir} />
        )}
      </main>

      {modalOpen && (
        <ProdutoModal
          produto={produtoSelecionado}
          onSave={salvar}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

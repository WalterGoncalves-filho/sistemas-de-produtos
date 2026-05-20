export default function ProdutoTable({ produtos, onEdit, onDelete }) {
  if (produtos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-lg">Nenhum produto cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="w-full text-sm text-left">
        <thead className="bg-indigo-600 text-white uppercase text-xs">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Preço</th>
            <th className="px-6 py-4">Estoque</th>
            <th className="px-6 py-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {produtos.map((p) => (
            <tr key={p.id} className="hover:bg-indigo-50 transition">
              <td className="px-6 py-4 text-gray-400 font-mono">{p.id}</td>
              <td className="px-6 py-4 font-medium text-gray-800">{p.nome}</td>
              <td className="px-6 py-4 text-gray-700">
                {Number(p.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  p.estoque === 0
                    ? 'bg-red-100 text-red-600'
                    : p.estoque <= 5
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {p.estoque} un.
                </span>
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

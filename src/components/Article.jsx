import useCompanies from "../hooks/useCompanies"

const Article = ({article}) => {
    const { handleModalEditArticle, handleModalDeleteArticle } = useCompanies()
    const {name, quantity, _id} = article
  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="text-xl">{name}</p>
            <p className="text-sm text-gray-500">Tiene: {quantity}</p>
        </div>
        <div className="flex gap-2">
            <button
               onClick={() => handleModalEditArticle(article)}
               className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Editar</button>
            <button
               onClick={() => handleModalDeleteArticle(article)}
               className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Article
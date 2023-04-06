import { useParams, Link } from "react-router-dom"
import useCompanies from "../hooks/useCompanies"
import { useEffect } from "react";
import ModalFormArticle from "../components/ModalFormArticle";
import ModalDeleteArticle from "../components/ModalDeleteArticle";
import Article from "../components/Article";
import Alert from "../components/Alert";
import useAdmin from "../hooks/useAdmin";


const Company = () => {
  const params = useParams();
  const { getCompany, company, loading, handleModalArticle, alert} = useCompanies()

  const admin  = useAdmin()

  useEffect(() => {
    getCompany(params.id)
  }, []);

  const { name } = company
  const { msg } = alert

  return (
    loading ? 'Cargando...' : (
      <>
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">{name}</h1>

      { admin && (

      <div className="flex items-center gap-2 text-gray-400 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>

      <Link
        to={`/companies/edit/${params.id}`}
        className="uppercase font-bold"
      >
        Editar
      </Link>

      </div>
    )}
      </div>

      {admin &&(
      <button
        onClick={handleModalArticle}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-4 flex gap-2 items-center justify-center"
       >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg> 

        Agregar Articulo
      </button>
      )}

      <p className="font-bold text-xl mt-10">Articulos de la Empresa</p>
      <div className="flex justify-center">
        <div className="md:w-1/3 lg:w-1/4">
            {msg && <Alert alert={alert}/>} 
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {company.articles?.length ? company.articles?.map( article => (
          <Article
              key={article._id}
              article={article}
          />        
        )) : 
        <p className="text-center my-5 p-10">No hay Articulos en esta empresa</p>}

      </div>
      <ModalFormArticle />
      <ModalDeleteArticle />
      </>
    )
  )
}

export default Company
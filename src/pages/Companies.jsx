import useCompanies from "../hooks/useCompanies"
import PreviewCompany from "../components/PreviewCompany"
const Companies = () => {

  const { companies } = useCompanies()
  return (
    <>
       <h1 className="text-4xl font-black">Empresas</h1>

       <div className="bg-white shadow mt-10 rounded-lg">
          {companies.length ? 
           companies.map( company => (
            <PreviewCompany
              key={companies._id}
              company={company}
            />
           ))
          : <p className=" text-center text-gray-600 uppercase p-5">No hay empresas</p>}
       </div> 
    </>
  )
}

export default Companies
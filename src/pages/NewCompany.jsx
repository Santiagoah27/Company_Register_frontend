import CompanyForm from "../components/CompanyForm";

const NewCompany = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Empresa</h1>

      <div className="mt-10 flex justify-center">
        <CompanyForm />
      </div>
    </>
  );
};

export default NewCompany;

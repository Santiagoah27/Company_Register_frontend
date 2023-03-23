import { useContext } from "react";
import CompaniesContext from "../context/CompaniesProvider";

const useCompanies = () => {
    return useContext(CompaniesContext)
}

export default useCompanies
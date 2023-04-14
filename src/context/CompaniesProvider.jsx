import React from 'react'
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";


const CompaniesContext = createContext()

const CompaniesProvider = ({children}) => {

    const [companies, setCompanies] = useState([])
    const [alert, setAlert] = useState({})
    const [company, setCompany] = useState({})
    const [loading, setLoading] = useState(false)
    const [ modalFormArticle, setModalFormArticle ] = useState(false)
    const [article, setArticle] = useState({})
    const [modalDeleteArticle, setModalDeleteArticle] = useState(false)

    const navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/companies', config)
                setCompanies(data)
            } catch (error) {
                console.log(error)
            }
        }
        getCompanies()
    }, [auth]);

    const showAlert = alert => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 5000);
    }

    const editCompany = async company => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.put(`/companies/${company.id}`, company, config)
            setCompanies(companies.map( companyState => companyState._id === data._id ? data : companyState))

            setAlert({
                msg: 'Empresa actualizada correctamente',
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/companies')
            }, 3000);

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
                navigate('/companies')
            }, 3000);
        }
    }

    const newCompany = async company => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/companies', company, config)

            setCompanies([...companies, data])

            setAlert({
                msg: 'Empresa creada correctamente',
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/companies')
            }, 3000);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlert({})
                navigate('/companies')
            }, 3000);
        }
    }

    const submitCompany = async company => {
        if(company.id) {
           await editCompany(company)
        } else {
            await newCompany(company)
        }
    }

    const getCompany = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/companies/${id}`, config)
            setCompany(data)

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const deleteCompany = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/companies/${id}`, config)

            const companiesUpdated = companies.filter( companyState => companyState._id !== id)

            setCompanies(companiesUpdated)

            setAlert({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/companies')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalArticle = () => {
        setModalFormArticle(!modalFormArticle)
        setArticle({})
    }

    const submitArticle = async article => {
        if(article?.id) {
           await editArticle(article)
        } else {
           await createArticle(article)
        }
        
    }

    const handleModalEditArticle = article => {
        setArticle(article)
        setModalFormArticle(true)
    }

    const createArticle = async article => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/articles', article, config)

            const articleUpdated = {...company}
            articleUpdated.articles = [...company.articles, data]
            setCompany(articleUpdated)
            setAlert({})
            setModalFormArticle(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editArticle = async article => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.put(`/articles/${article.id}`, article, config)
            const companyUpdated = {...company}
            companyUpdated.articles = companyUpdated.articles.map( articleState => articleState._id === data._id ? data : articleState)
            setCompany(companyUpdated)
            setAlert({})
            setModalFormArticle(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalDeleteArticle = article => {
        setArticle(article)
        setModalDeleteArticle(!modalDeleteArticle)
    }

    const deleteArticle = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/articles/${article._id}`, config)
            setAlert({
                msg: data.msg,
                error: false
            })
            const companyUpdated = {...company}
            companyUpdated.articles = companyUpdated.articles.filter(articleState => articleState._id !== article._id)
            setCompany(companyUpdated)
            setModalDeleteArticle(false)
            setArticle({})
            setTimeout(() => {
                setAlert({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const closeSessionCompanies = () => {
        setCompanies([])
        setCompany({})
        setAlert({})
    }

    return (
        <CompaniesContext.Provider
           value={{
             companies,
             showAlert,
             alert,
             submitCompany,
             getCompany,
             company,
             loading,
             deleteCompany,
             modalFormArticle,
             handleModalArticle,
             submitArticle,
             handleModalEditArticle,
             article,
             modalDeleteArticle,
             handleModalDeleteArticle,
             deleteArticle,
             closeSessionCompanies
           }}
        > {children}
        </CompaniesContext.Provider>
    )
}

export {
    CompaniesProvider
}

export default CompaniesContext
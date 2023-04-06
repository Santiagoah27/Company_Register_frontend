import useAuth from "./useAuth"

const useAdmin = () => {
    const { auth } = useAuth()
    return auth._id === "641a2591a499d434f007334b"
  
}

export default useAdmin
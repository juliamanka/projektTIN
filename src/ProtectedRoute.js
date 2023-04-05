import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./helpers/authHelper";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function ProtectedRoute({children}) {
    if (!isAuthenticated()) {
        toast.error("Uzytkownik nie jest zalogowany",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute
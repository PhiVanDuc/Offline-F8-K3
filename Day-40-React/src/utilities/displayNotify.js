import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const displayNotify = (condition, content) => {
    if (condition === "success") {
        return toast.success(`${content}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else if (condition === "warning") {
        return toast.warn(`${content}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else if (condition === "error") {
        return toast.error(`${content}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

export default displayNotify;
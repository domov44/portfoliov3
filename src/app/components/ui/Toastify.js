import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fonction pour afficher un toast
const showToast = (message, options = {}) => {

  const {
    type = 'success', // Par défaut, le type est 'success'
    ...otherOptions   // Options supplémentaires
  } = options;

  // Récupérer la valeur du thème à chaque appel
  const currentTheme = localStorage.getItem("theme");

  const toastOptions = {
    theme: currentTheme === 'light' ? 'light' : 'dark',
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide, 
    ...otherOptions,
  };

  switch (type) {
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'default':
      toast(message, toastOptions);
      break;
    default:
      toast.success(message, toastOptions);
  }
}

// Fonctions de notification
const notifySuccess = (message) => showToast(message, { type: 'success'});
const notifyError = (message) => showToast(message, { type: 'error'});
const notifyInfo = (message) => showToast(message, { type: 'info'});
const notifyWarning = (message) => showToast(message, { type: 'warning'});
const notifyDefault = (message) => showToast(message, { type: 'default'});

export { showToast, ToastContainer, notifySuccess, notifyError, notifyInfo, notifyWarning, notifyDefault };
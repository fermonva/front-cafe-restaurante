import Modal from "react-modal";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalProducto from '../components/ModalProducto';
import Resumen from '../components/Resumen';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';
import useFreshCoffe from "../hooks/useFreshCoffe";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export default function Layout() {

  useAuth({ middleware: 'auth' })
  const { modal } = useFreshCoffe()

  return (
    <>
      <div className='md:flex'>
        <Sidebar />
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>
        <Resumen />
      </div>
      <Modal
        isOpen={modal}
        style={customStyles}>
        <ModalProducto />
      </Modal>
      <ToastContainer
        position="top-center"
      />
    </>
  )
}

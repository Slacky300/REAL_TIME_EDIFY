import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login';
import PrivateRoutes from './helpers/routes/PrivateRoutes';
import Register from './pages/auth/Register';
import DocumentHome from './pages/main/DocumentHome';
import EditDocument from './pages/main/EditDocument';


function App() {

  return (


    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<PrivateRoutes />}>
            <Route path='/home' element={<DocumentHome/>} />
            <Route path='/edit/:id' element={<EditDocument/>} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
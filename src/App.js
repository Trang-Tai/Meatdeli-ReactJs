import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './routes/Admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import User from './routes/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='admin/*' element={<Admin />} />
          <Route path='/*' element={<User />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

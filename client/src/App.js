
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Outlet } from 'react-router-dom';

// import { ToastContainer } from "react-toastify";

function App() {
  return (

    <>
  <Toaster/>
    
    <main > 
    
        <Outlet/>
     </main>
    </>
      
  
   
  );
}

export default App;

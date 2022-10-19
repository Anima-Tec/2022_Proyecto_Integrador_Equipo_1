import React,{useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({notifi, state, show}) => {


  useEffect(() => {
    if (show){      
      if (!state){
         toast.error(notifi,{
          theme: "colored"
         });
      } else {
        toast.success(notifi,{
          theme: "colored"
        });
      }
    }
  }, [show])
  

  return(
    <div>
      <ToastContainer 
      progressClassName="toastProgress"
      bodyClassName="toastBody"
      iconClassName="bg-white"
      position="top-center"
      autoClose={3000}
      />
    </div>
    )
}
 
export default CustomToast;

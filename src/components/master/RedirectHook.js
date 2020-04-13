import { useHistory } from 'react-router-dom';
export const RedirectHook = 
{
    Push : (path)=>{
        useHistory().push(path);
    }
  }
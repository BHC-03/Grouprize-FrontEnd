import {useState,useEffect} from 'react';

const useForm = (atom)=>{
    const [errors,setErrors] = useState({
        name:'',
        email:'',
        password:''
    });
    useEffect(()=>{
        if(!atom.email){
            setErrors(olderrors=>({...olderrors,email:'email is required'}))
        }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(atom.email))){
            setErrors(olderrors=>({...olderrors,email:'email is Invalid'}))
        }else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(atom.email)){
            setErrors(olderrors=>({...olderrors,email:''}))
        }
    
        if(!atom.password){
            setErrors(olderrors=>({...olderrors,password:'password is required'}))
        }else if(atom.password){
            setErrors(olderrors=>({...olderrors,password:''}))
        }
    },[atom])

    return([errors,setErrors]);
}

export default useForm;
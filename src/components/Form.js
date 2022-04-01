import { useState, useEffect } from 'react';
import {FormControl, TextField, Input} from '@mui/material';
import { Button, Box } from '@mui/material';
export default function Form(props){
    const [formData, setFormData] = useState({
        userName:'',
        bckClr:'',
        txtClr:'',
    })

    function handleSubmit(e){
        e.preventDefault();
        props.changeData(formData);
    
    }

    function handleChange(e){
        e.preventDefault();
        console.log(e.target.name)
        if(e.target.name ==='username')
            setFormData(prev=>({...prev, userName: e.target.value}))
        else if(e.target.name ==='bckclr')
            setFormData(prev=>({...prev, bckClr: e.target.value}))
        else if(e.target.name==='txtclr')
            setFormData(prev=>({...prev,txtClr:e.target.value}))
    }

    return(
<form style={{textAlign: 'center'}}   onSubmit={handleSubmit}>
<Input 
  placeholder="Username"
  value={formData.userName}
  name='username'
  onChange={handleChange}
/>
<br/>
<Input 
variant='contained'
  placeholder="Background Color"
  value={formData.bckClr}
  name='bckclr'
  onChange={handleChange}
/>
<br/>
<Input 
  placeholder="Text Color"
  value={formData.txtClr}
  name='txtclr'
  onChange={handleChange}
/><br/><br/>
<Button sx={{color:'black',borderColor:'black'}} variant='outlined' type='submit'>
Change
</Button>


</form>
    )
}
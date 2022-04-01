import { useState, useEffect } from 'react';
import {FormControl, TextField, Input} from '@mui/material';
import { Button, Box } from '@mui/material';
export default function Form(props){
    const [userName,setUserName] = useState('')
    const [bckClr,setBckClr] = useState('')
    const [txtClr,setTxtClr] = useState('')



    function handleSubmit(e){
        e.preventDefault();
        
        props.changeData(e.target.username.value);
    }

    function handleChange(e){
        e.preventDefault();
        setUserName(e.target.value)
    }

    return(
    <form style={{textAlign: 'center'}}  onSubmit={handleSubmit}>
<Input 
  placeholder="Username"
  value={userName}
  name='username'
  onChange={handleChange}
/><br/>
<Input 
  placeholder="Background Color"
  value={bckClr}
  name='bckclr'
  onChange={handleChange}
/><br/>
<Input 
  placeholder="Text Color"
  value={txtClr}
  name='txtclr'
  onChange={handleChange}
/>
<br/>
<Button type='submit'>
Change
</Button>
</form>
    )
}
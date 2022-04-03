import Clock from './Clock';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import Form from './Form'

export default function Profile(){
    const [user,setUser] = useState('User')
    const [debit, setDebit] = useState([])
    const [credit,setCredit] = useState([])
    const [specifyData, setSpecifyData] = useState('debit')
    const [bckClr,setBckClr] = useState('')
    const [txtClr,setTxtClr] = useState('')
    
    async function getDebits(){
        const debits = await axios.get('https://moj-api.herokuapp.com/debits')
        setDebit(debits.data) 
    }

    async function getCredits(){
        const credits = await axios.get('https://moj-api.herokuapp.com/credits')
        setCredit(credits.data)
    }

    useEffect( () => {
      getDebits();
      getCredits();
      }, []);

    const debitList = debit.map(d =>
    <li style={{ textAlign: 'center', marginBottom:1}} key={d.id}> 
    <b style={{textDecoration:'underline'}}>Description:</b> {d.description},<b style={{textDecoration:'underline'}}>Price:</b> ${d.amount}, <b style={{textDecoration:'underline'}}>Date:</b> {d.date.slice(0,10)}
     </li>
    ) 

    const creditList = credit.map(c =>
        <li style={{ textAlign: 'center'}} key={c.id}> 
        <b style={{textDecoration:'underline'}}>Description:</b> {c.description}, <b style={{textDecoration:'underline'}}> Price:</b> ${c.amount}, <b style={{textDecoration:'underline'}}>Date:</b> {c.date.slice(0,10)}
         </li>
        ) 

        const types = ["debit", "credit"];
        function ToggleGroup() {
          const activated = specifyData
          return (
            <Box sx={{textAlign: 'center',marginBottom:2}} >
              {types.map((type) => (
                <Button variant="contained" active={specifyData === type} onClick={() => setSpecifyData(type)}>
                  {type}
                </Button>
              ))}
            </Box>
          );
        }
        
        function handleSubmit(formData){
            setBckClr(formData.bckClr)
            setUser(formData.userName)
            setTxtClr(formData.txtClr)
            
        }

    return(
    <Box sx={{backgroundColor: bckClr, height: '100vh', color:txtClr}} >
        <Box sx={{display:'flex',  justifyContent: 'center', }}>
            <h2 style={{marginRight:'10px'}}> Hello {user}! </h2> 
            <Clock/>
        </Box>
        <ToggleGroup />
      {specifyData ==='debit' ? debitList: creditList}<br/>
    <Form changeData={handleSubmit}/>
    </Box>
    )
}


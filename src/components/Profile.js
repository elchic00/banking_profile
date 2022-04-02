import Clock from './Clock';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import Form from './Form'

export default function Profile(){
    const [form,setForm] = useState({
        user: 'User',
        bckClr: '',
        txtClr: ''
    })
    const [finData, setFinData] = useState({
        debit:[],
        credit:[]
    })
    const [debitOrCredit, setDebitOrCredit] = useState('debit')
    
    async function getDebits(){
        const debits = await axios.get('https://moj-api.herokuapp.com/debits')
        setFinData(prev=>({...prev, debit: debits.data})) 
    }

    async function getCredits(){
        const credits = await axios.get('https://moj-api.herokuapp.com/credits')
        setFinData(prev=>({...prev, credit: credits.data})) 
    }

    useEffect( () => {
      getDebits();
      getCredits();
      }, []);

      const listStyle = {
        textAlign: 'center', marginBottom:1
      }
      const underline = {
        textDecoration:'underline'
      }
      const ulListStyle = {
        display:'inline-block',justifyContent:'center'
      }

    function debitList(){
        const debitlist = finData.debit.map(d =>
        <li key={d.id}> 
        <b style={underline}>Description:</b> {d.description}, <b style={underline}> Price:</b> ${d.amount}, <b style={underline}>Date:</b> {d.date.slice(0,10)}
        </li>
    ) 
    return <ul style={ulListStyle}>{debitlist}</ul> 
}

     function creditList(){
         const creditlist = finData.credit.map(c =>
        <li  key={c.id}> 
        <b style={underline}>Description:</b> {c.description}, <b style={underline}> Price:</b> ${c.amount}, <b style={underline}>Date:</b> {c.date.slice(0,10)}
         </li>
         )
        return <ul style={ulListStyle}>{creditlist}</ul> 
    }

        const types = ["debit", "credit"];
        function ToggleData() {
          const activated = debitOrCredit
          return (
            <Box sx={{textAlign: 'center',marginBottom:2}} >
              {types.map((type) => (
                <Button sx={{marginRight:1}} variant="contained" active={debitOrCredit === type} onClick={() => setDebitOrCredit(type)}>
                  {type}
                </Button>
              ))}
            </Box>
          );
        }
        
        function handleSubmit(formData){
            setForm(prev=>({...prev, bckClr: formData.bckClr, user: formData.userName, txtClr: formData.txtClr}))
        }

    return(
    <Box sx={{backgroundColor: form.bckClr, height: '100vh', color:form.txtClr}} >
        <Box sx={{display:'flex',  justifyContent: 'center', }}>
            <h2 style={{marginRight:'10px'}}> Hello {form.user}! </h2> 
            <Clock/>
        </Box>
        <ToggleData />
      <Box sx={listStyle}>{debitOrCredit ==='debit' ? debitList(): creditList()}<br/> </Box>
    <Form changeData={handleSubmit}/>
    </Box>
    )
}


import { useState, useEffect } from "react";
import { FormControl, TextField, Input } from "@mui/material";
import { Button, Box } from "@mui/material";
export default function Form(props) {
  const [formData, setFormData] = useState({
    userName: "",
    bckClr: "",
    txtClr: "",
  });
  //disable button after click
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.changeData(formData);
    setIsDisabled(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <Box
      component="form"
      style={{
        "& > :not(style)": { m: 1, width: "25ch" },
        textAlign: "center",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-name"
        value={formData.userName}
        label="Username"
        name="userName"
        onChange={handleChange}
      />
      <TextField
        value={formData.bckClr}
        name="bckClr"
        label="Background Color"
        onChange={handleChange}
      />
      <TextField
        label="Text Color"
        value={formData.txtClr}
        name="txtClr"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button
        sx={{ color: "black", borderColor: "black", marginBottom: 2 }}
        type="submit"
        variant="outlined"
        disabled={isDisabled}
      >
        Change
      </Button>
    </Box>
  );
}

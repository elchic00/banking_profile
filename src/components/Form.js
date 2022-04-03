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
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
      <Input
        placeholder="Username"
        value={formData.userName}
        name="userName"
        onChange={handleChange}
      />
      <br />
      <Input
        variant="contained"
        placeholder="Background Color"
        value={formData.bckClr}
        name="bckClr"
        onChange={handleChange}
      />
      <br />
      <Input
        placeholder="Text Color"
        value={formData.txtClr}
        name="txtClr"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button
        sx={{ color: "black", borderColor: "black" }}
        type="submit"
        variant="outlined"
        disabled={isDisabled}
      >
        Change
      </Button>
    </form>
  );
}

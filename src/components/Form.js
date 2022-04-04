import { useState } from "react";
import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";

export default function Form({ changeData }) {
  const [formData, setFormData] = useState({
    userName: "",
    backgrColor: "",
    textColor: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    changeData(formData);
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
        value={formData.userName}
        label="Username"
        name="userName"
        onChange={handleChange}
      />
      <TextField
        value={formData.backgrColor}
        name="backgrColor"
        label="Background Color"
        onChange={handleChange}
      />
      <TextField
        sx={{ mb: 3 }}
        value={formData.textColor}
        label="Text Color"
        name="textColor"
        onChange={handleChange}
      />
      <br />
      <Button
        sx={{ color: "black", borderColor: "black", marginBottom: 2 }}
        type="submit"
        variant="outlined"
      >
        Change
      </Button>
    </Box>
  );
}

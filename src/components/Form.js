import { useState } from "react";
import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";

export default function Form({ changeData, data }) {
  const [formData, setFormData] = useState(data);

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
      {Object.entries(formData).map(([key, value]) => (
        <TextField
          label={key}
          name={key}
          id={key}
          onChange={handleChange}
        />
      ))}
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

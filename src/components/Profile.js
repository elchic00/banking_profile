import Clock from "./Clock";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
} from "@mui/material";
import Form from "./Form";
import profile from "../style/profile.css";

export default function Profile() {
  const [form, setForm] = useState({
    user: "User",
    bckClr: "",
    txtClr: "",
    disableForm: "false",
    toggleTextColor: "black",
  });
  const [finData, setFinData] = useState({
    loading: "true",
    debit: [],
    credit: [],
  });
  const [debitOrCredit, setDebitOrCredit] = useState("debit");

  async function getFinData() {
    const debits = await axios.get("https://moj-api.herokuapp.com/debits");
    const credits = await axios.get("https://moj-api.herokuapp.com/credits");
    setFinData((prev) => ({
      ...prev,
      debit: debits.data,
      credit: credits.data,
      loading: "false",
    }));
  }

  useEffect(() => {
    getFinData();
  }, []);

  function handleSubmit(formData) {
    setForm((prev) => ({
      ...prev,
      bckClr: formData.bckClr,
      user: formData.userName,
      txtClr: formData.txtClr,
      disableForm: "true",
      toggleTextColor: formData.txtClr,
    }));
  }

  function debitList() {
    const debitlist = finData.debit.map((d) => (
      <li key={d.id}>
        <b>Description:</b> {d.description} <br />
        <b> Price:</b> ${d.amount} <br />
        <b>Date:</b> {d.date.slice(0, 10)}
      </li>
    ));
    return <ol>{debitlist}</ol>;
  }

  function creditList() {
    const creditlist = finData.credit.map((c) => (
      <li key={c.id}>
        <b>Description:</b> {c.description} <br />
        <b> Price:</b> ${c.amount} <br />
        <b>Date:</b> {c.date.slice(0, 10)}
      </li>
    ));
    return <ol>{creditlist}</ol>;
  }

  const types = ["debit", "credit"];
  function ToggleData() {
    const activated = debitOrCredit;
    return (
      <Box sx={{ textAlign: "center", marginBottom: 1 }}>
        {types.map((type) => (
          <ToggleButtonGroup color="primary" value={debitOrCredit}>
            <ToggleButton
              sx={{ color: form.toggleTextColor }}
              value={type}
              onClick={() => setDebitOrCredit(type)}
            >
              {type}
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: form.bckClr,
        height: "100vh",
        color: form.txtClr,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ marginRight: "10px" }}> Hello {form.user}! </h2>
        <Clock />
      </Box>
      <ToggleData />
      {finData.loading === "true" && <LinearProgress />}
      <Box sx={{ marginBottom: 1 }}>
        {debitOrCredit === "debit" ? debitList() : creditList()}
        <br />{" "}
      </Box>
      {form.disableForm === "false" ? <Form changeData={handleSubmit} /> : null}
    </Box>
  );
}

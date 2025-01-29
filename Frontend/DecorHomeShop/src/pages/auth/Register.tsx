import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/Auth/authService";
import { Box, TextField, Button, Typography } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert("User successfully registered. You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;

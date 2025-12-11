import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";

export default function AICreationButton({ onAIResponse }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("prompt");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModeChange = (e) => setMode(e.target.value);
  const handlePromptChange = (e) => setPrompt(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let aiJSON;

      if (mode === "prompt") {
        // Call backend at localhost:5000
        const response = await axios.post("http://localhost:5000/generate", {
          prompt: prompt || "random palette",
        });

        aiJSON = response.data;
      }

      if (mode === "extraction" && image) {
        const fd = new FormData();
        fd.append("image", image);
        const response = await axios.post("http://localhost:5000/generate", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        aiJSON = response.data;
      }

      if (onAIResponse) onAIResponse(aiJSON);

      // Reset UI
      setOpen(false);
      setPrompt("");
      setImage(null);
      setMode("prompt");

    } catch (err) {
      console.error("AI API Error:", err);
      alert("AI generation failed. Check backend console.");
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ textTransform: "none" }}
      >
        AI Creation
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>AI Palette Creation</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={mode} onChange={handleModeChange} row>
              <FormControlLabel value="prompt" control={<Radio />} label="Prompt" />
              <FormControlLabel value="extraction" control={<Radio />} label="Image Extraction" />
            </RadioGroup>
          </FormControl>

          {mode === "prompt" && (
            <div style={{ marginTop: "1rem" }}>
              <TextField
                fullWidth
                label="Enter your prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="e.g., colors inspired by sunset"
              />
            </div>
          )}

          {mode === "extraction" && (
            <div style={{ marginTop: "1rem" }}>
              <TextField
                fullWidth
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleImageChange}
              />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Generating..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

"use client";  // Add this line at the top
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function FireReportForm() {
  const [report, setReport] = useState({
    location: '',
    description: '',
    date: '',
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

export default function report() {
    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%]">
                    <h3>FIREFL.AI</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">REPORT </span>PAGE
                    </h1>
                    <div className="flex justify-right v-screen">
                        <Image src={image1} alt='alt' width={550} height={550} className="absolute top-20 right-20" />
                    </div>
                    <h3>See a fire? Report using the form below.</h3>
                    <h3 className="mt-5 mb-10">Your contribution saves lives.</h3>
                    <div className = "space-y-4">
                        <Input type="text" id="location" placeholder="Location of Sighting" maxlength = "30" className="w-80" />
                        <Input type="text" id="location" placeholder="Time of Sighting" maxlength = "30" className="w-80" />
                        <h4 className="pl-2">Upload a photo of the sighting</h4>
                        <Input id="picture" type="file" maxlength = "30" className="w-80" />
                    </div>
                    <button className="w-20 h-10 flex items-center justify-center mt-4 rounded-md bg-[#c35a05] hover:bg-orange-600 hover:shadow-lg" >
                        <span className="text-white">SUBMIT</span>
                    </button>
                </header>
            </article>
        </div>
    );
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReport({ ...report, file });
    setFilePreview(URL.createObjectURL(file)); // To preview the uploaded image
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('location', report.location);
    formData.append('description', report.description);
    formData.append('date', report.date);
    formData.append('file', report.file);

    // Here you would handle the API call to submit the form data
    console.log('Form submitted!', report);
    // Use fetch or axios to send formData to backend

    // Reset the form after submission
    setReport({
      location: '',
      description: '',
      date: '',
      file: null,
    });
    setFilePreview(null); // Clear the preview image
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '20px' }}>
      <Box
        sx={{
          backgroundColor: '#fff', // White background
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Add some shadow for effect
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Submit Fire Report
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Location"
              name="location"
              value={report.location}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              name="description"
              value={report.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="date"
              label="Date of Fire"
              name="date"
              value={report.date}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          {/* Place buttons on the same level */}
          <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Report
            </Button>
          </Box>

          {filePreview && (
            <Box mb={2}>
              <Typography>Photo Preview:</Typography>
              <img
                src={filePreview}
                alt="Preview"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
}

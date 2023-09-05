// src/components/NotificationPreview.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface FormValues {
  name: string;
  description: string;
  templateBody: string;
}

interface Props {
  formData: FormValues;
}

const NotificationPreview: React.FC<Props> = ({ formData }) => {
  const { name, description, templateBody } = formData;

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)',
        borderRadius: '8px',
      }}
    >
      <Typography variant='h5' style={{ marginBottom: '16px' }}>
        Notification Preview
      </Typography>
      <div
        style={{
          height: '365px',
          overflowY: 'auto',
        }}
      >
        <h2>{name}</h2>
        <p>{description}</p>
        <div dangerouslySetInnerHTML={{ __html: templateBody }} />
      </div>
    </Paper>
  );
};

export default NotificationPreview;

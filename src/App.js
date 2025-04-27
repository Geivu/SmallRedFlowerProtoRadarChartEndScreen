import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Container, Typography, Paper } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Function to generate random Chinese name
const generateChineseName = () => {
  const surnames = ['王', '李', '張', '劉', '陳', '楊', '黃', '趙', '周', '吳'];
  const names = ['明', '華', '強', '偉', '芳', '娜', '秀英', '敏', '靜', '麗'];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
  const randomName = names[Math.floor(Math.random() * names.length)];
  return randomSurname + randomName;
};

function App() {
  const playerName = generateChineseName();
  
  // Sample data - replace with actual game results
  const gameResults = {
    準確度: 85,
    反應時間: 75,
    得分: 90,
    連擊數: 80,
    節奏感: 88,
    穩定度: 82
  };

  const data = {
    labels: Object.keys(gameResults),
    datasets: [
      {
        label: '遊戲表現',
        data: Object.values(gameResults),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${playerName}的節奏遊戲表現分析`
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {playerName}表現分析
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Radar data={data} options={options} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 
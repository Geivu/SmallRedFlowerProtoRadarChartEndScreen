import React, { useState, useEffect } from 'react';
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

// Function to generate random game results
const generateRandomResults = () => {
  return {
    準確度: Math.floor(Math.random() * 30) + 70, // Random number between 70-100
    反應時間: Math.floor(Math.random() * 30) + 70,
    得分: Math.floor(Math.random() * 30) + 70,
    連擊數: Math.floor(Math.random() * 30) + 70,
    節奏感: Math.floor(Math.random() * 30) + 70,
    穩定度: Math.floor(Math.random() * 30) + 70
  };
};

function App() {
  const [playerName, setPlayerName] = useState(generateChineseName());
  const [gameResults, setGameResults] = useState(generateRandomResults());

  useEffect(() => {
    const timer = setInterval(() => {
      setPlayerName(generateChineseName());
      setGameResults(generateRandomResults());
    }, 60000); // Update every minute (60000 ms)

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

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
        suggestedMax: 100,
        ticks: {
          font: {
            size: 16 // Increase font size for axis labels
          }
        },
        pointLabels: {
          font: {
            size: 18 // Increase font size for category labels
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16 // Increase font size for legend
          }
        }
      },
      title: {
        display: true,
        text: `${playerName}的節奏遊戲表現分析`,
        font: {
          size: 24 // Increase font size for title
        }
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
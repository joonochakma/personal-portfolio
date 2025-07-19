export const posts = [
  {
    id: 1,
    slug: 'weatherStack',
    title: 'Weather Prediction Stack Application',
    href: '/projects/weatherStack',
    description:
      'A full-stack weather website with a React frontend that uses Chart.js to enhance the visualization of predictions, and a machine learning backend for weather forecasting. The backend leverages Bureau of Meteorology weather data, is built with FastAPI, and is deployed using Docker and AWS Fargate.',
    imageUrl: '/DCA.png',
    date: 'Aug 28, 2024',
    datetime: '2024-08-28',
    category: ['Machine Learning', 'Full Stack Application'],
    github: 'https://github.com/joonochakma/weather-prediction-stack',
    live: 'http://weathe-farga-fxytsslj90u4-1809650055.ap-southeast-4.elb.amazonaws.com/home',
  },
  {
    id: 2,
    slug: 'robotMazeNavigation',
    title: 'Robot Maze Navigation',
    href: '/projects/robotMazeNavigation',
    description:
      'A project developed in an Artificial Intelligence course, applying tree-based search algorithms to solve a robot maze navigation problem on an NxM grid. The robot functions as an AI agent, navigating from an initial cell to a target cell while avoiding walls and selecting optimal paths. The project explores both uninformed search strategies (BFS, DFS) and informed, heuristic-based algorithms (Greedy Best-First Search, A*, and custom methods). These AI techniques demonstrate fundamental concepts in problem solving, pathfinding, and decision-making, with a focus on evaluating search efficiency, optimality, and heuristic design.',
    imageUrl: '/Maze.jpeg',
    date: ' Mar 12, 2024',
    datetime: '2024-03-12',
    category: ['Artificial Intelligence', 'Data Structure and Algorithms'],
    github: 'https://github.com/joonochakma/robot-maze-navigation',
  },
  {
    id: 3,
    slug: 'fridgeSensor',
    title:
      'Smart Fridge Monitoring System using Arduino and UART Communication',
    href: '/projects/fridgeSensor',
    description:
      'This project was developed to address the common issue of refrigerator doors being left open, which can lead to food spoilage due to temperature rising into the food safety "danger zone" (typically between 5°C and 60°C). The system ensures that the fridge maintains a safe storage environment by continuously monitoring internal temperature and door status. An Arduino Uno was used to collect real-time data from a temperature sensor (e.g., LM35 or DHT11) and a Light Dependent Resistor (LDR), which detects whether the fridge door is open based on ambient light levels. The Arduino transmits the sensor data to a Raspberry Pi virtual machine (VM) using the UART (Universal Asynchronous Receiver-Transmitter) protocol via serial communication. The Raspberry Pi parses the data and stores it in a local database for logging and analysis. By detecting prolonged door openings and identifying when the temperature enters the danger zone, this system supports food safety compliance and helps prevent potential health risks.',
    imageUrl: '/IoTPhoto.png',
    date: 'Apr 22, 2024',
    datetime: '2024-04-22',
    category: ['Internet of Things', 'Raspberry Pi', 'Arduino'],
    github: 'https://github.com/joonochakma/IoT-Device-Fridge-Sensor',
    live: 'https://youtu.be/rUM4wnOlZ9s',
  },
  {
    id: 4,
    slug: 'MusicApp',
    title: 'MusicApp',
    href: '/projects/MusicApp',
    description:
      'A full-stack weather website with a React frontend that uses Chart.js to enhance the visualization of predictions, and a machine learning backend for weather forecasting. The backend leverages Bureau of Meteorology weather data, is built with FastAPI, and is deployed using Docker and AWS Fargate.',
    imageUrl: '/musicApp.mp4',
    date: 'Aug 28, 2024',
    datetime: '2024-08-28',
    category: ['Machine Learning', 'Full Stack Application'],
    github: 'https://github.com/joonochakma/weather-prediction-stack',
    live: 'http://weathe-farga-fxytsslj90u4-1809650055.ap-southeast-4.elb.amazonaws.com/home',
  },
];

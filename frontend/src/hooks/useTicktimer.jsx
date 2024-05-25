// Import the useState hook from React for managing state
import { useState } from "react";

// Import the CSS file for styling

// Define the main App component
export default function App() {
  // Initialize state variables for timer and timeInterval
  const [timer, setTimer] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  // Function to start the timer
  const startTimer = () => {
    // Check if the timer is already running
    if (isRunning) {
      return;
    }

    setIsRunning(true);
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(
      setInterval(() => {
        // Update the timer by incrementing the previous value by 1
        setTimer((prev) => prev + 1);
      }, 1000)
    );
  };

  // Function to pause the timer
  const pauseTimer = () => {
    // Set the isRunning state to false to indicate the timer is paused
    setIsRunning(false);
    // Clear the interval to stop the timer from updating
    clearInterval(timeInterval);
  };

  // Function to reset the timer
  const resetTimer = () => {
    // Set the isRunning state to false to indicate the timer is not running
    setIsRunning(false);

    // Reset the timer value to 0
    setTimer(0);
    // Clear the interval to stop the timer
    clearInterval(timeInterval);
  };

  return [timer, startTimer, pauseTimer, resetTimer, isRunning];
}

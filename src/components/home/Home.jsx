import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const button = document.getElementById('start-button');
        button.classList.add('animate__animated', 'animate__pulse');
        
        // Start a pulse animation when the component mounts
        const interval = setInterval(() => {
            button.classList.toggle('animate__pulse');
        }, 2000);

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    const checkNameAndRedirect = () => {
        let name = prompt("Please enter your name");

        if (name === "Pallavi"||name === "pallavi"||name === "PALLAVI"||name==="Chotu Don"||name==="chotu don"||name==="CHOTU DON") {
            alert("Chotu Detected! Welcome to the Workout Tracker, Chotu!");
        }
        else if (name === "Arnav"||name === "arnav"||name === "ARNAV") {
            alert("Welcome Sir!")
        }
         else if (name) {
            alert(`Welcome to the Workout Tracker, ${name}!`);
        } else {
            alert("No name entered. Welcome to the Workout Tracker!");
        }

        // Delay the navigation to ensure the alert is fully handled before redirecting
        setTimeout(() => {
            navigate('/workout');
        }, 100); // Small delay of 100ms
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center">
            {/* Header */}
            <header className="text-5xl font-bold mb-4 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInDown">
                Workout Tracker
            </header>

            {/* Description */}
            <p className="mb-6 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp">
                Track your workouts and stay fit!
            </p>

            {/* Single button to greet and redirect */}
            <button
                id="start-button"
                onClick={checkNameAndRedirect}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded transition duration-200 transform active:scale-95"
            >
                Get Started
            </button>
        </div>
    );
};

export default Home;

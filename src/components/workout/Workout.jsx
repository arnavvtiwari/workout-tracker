
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Workout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [groupName, setGroupName] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddOrUpdateWorkout = (e) => {
        e.preventDefault();
        if (workoutName && weight && repetitions && sets && groupName) {
            const newWorkout = {
                name: workoutName,
                weight,
                repetitions,
                sets,
                group: groupName,
            };

            if (isEditing) {
                const updatedWorkouts = [...workouts];
                updatedWorkouts[editingIndex] = newWorkout;
                setWorkouts(updatedWorkouts);
                setIsEditing(false);
                setEditingIndex(null);
            } else {
                setWorkouts([...workouts, newWorkout]);
            }

            // Clear form fields and close modal
            setWorkoutName('');
            setWeight('');
            setRepetitions('');
            setSets('');
            setGroupName('');
            setIsModalOpen(false);
        }
    };

    const handleEditWorkout = (index) => {
        const workout = workouts[index];
        setWorkoutName(workout.name);
        setWeight(workout.weight);
        setRepetitions(workout.repetitions);
        setSets(workout.sets);
        setGroupName(workout.group);
        setIsEditing(true);
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDeleteWorkout = (index) => {
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts);
    };

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        acc[workout.group] = acc[workout.group] || [];
        acc[workout.group].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Workout Tracker</h1>

            {/* Button to Open Modal */}
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-200"
            >
                Add Workout
            </button>
            <Link to={"/"} className='className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-200"'> Home</Link>

            {/* Modal for Adding/Editing Workouts */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <form 
                        onSubmit={handleAddOrUpdateWorkout} 
                        className="bg-gray-900 p-6 rounded w-80"
                    >
                        <h2 className="text-xl font-bold mb-2">{isEditing ? 'Edit Workout' : 'Add Workout'}</h2>
                        <input
                            type="text"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            placeholder="Workout Name"
                            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Weight (in kg)"
                            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            value={repetitions}
                            onChange={(e) => setRepetitions(e.target.value)}
                            placeholder="Repetitions"
                            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                            placeholder="Sets"
                            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group Name"
                            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
                            required
                        />
                        <div className="flex justify-between">
                            <button 
                                type="submit"
                                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
                            >
                                {isEditing ? 'Update' : 'Add'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setIsEditing(false);
                                    setEditingIndex(null);
                                    setWorkoutName('');
                                    setWeight('');
                                    setRepetitions('');
                                    setSets('');
                                    setGroupName('');
                                }}
                                className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {Object.keys(groupedWorkouts).length > 0 && (
                <div className="bg-gray-900 p-4 rounded w-full">
                    <h2 className="text-2xl font-semibold mb-2">Added Workouts</h2>
                    {Object.entries(groupedWorkouts).map(([group, workouts]) => (
                        <div key={group} className="mb-4">
                            <h3 className="text-xl font-bold">{group}</h3>
                            <ul className="space-y-2">
                                {workouts.map((workout, index) => (
                                    <li key={index} className="p-2 bg-gray-700 rounded flex justify-between items-center">
                                        <span>
                                            <strong>{workout.name}</strong> | 
                                            Weight: {workout.weight} kg, 
                                            Reps: {workout.repetitions}, 
                                            Sets: {workout.sets}
                                        </span>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => handleEditWorkout(index)}
                                                className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteWorkout(index)}
                                                className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Workout;

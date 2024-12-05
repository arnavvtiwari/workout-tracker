import React, { useState, useEffect } from 'react';

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

    // Fetch workouts from DB on component mount
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('https://workout-backend-1-thud.onrender.com/workout'); // Replace with your actual endpoint
                const data = await response.json();
                if (response.ok) {
                    setWorkouts(data.workouts); // Assuming the API returns workouts in `data.workouts`
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    const handleAddOrUpdateWorkout = async (e) => {
        e.preventDefault();
        if (workoutName && weight && repetitions && sets && groupName) {
            const newWorkout = {
                name: workoutName,
                weight: Number(weight),
                repetitions: Number(repetitions),
                sets: Number(sets),
                group: groupName,
            };
            console.log(newWorkout);

            try {
                let response;
                if (isEditing) {
                    // Update workout in DB
                    const workoutId = workouts[editingIndex]._id; // Assuming `_id` is provided by the database
                    response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${workoutId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkout),
                    });
                } else {
                    // Add new workout to DB
                    response = await fetch('https://workout-backend-1-thud.onrender.com/workout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkout),
                    });
                }

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    setWorkouts(await fetchWorkoutsFromDb());
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error saving workout:', error);
            }

            // Clear form fields and close modal
            resetForm();
        }
    };

    const fetchWorkoutsFromDb = async () => {
        try {
            const response = await fetch('https://workout-backend-1-thud.onrender.com/workout');
            const data = await response.json();
            return response.ok ? data.workouts : workouts;
        } catch (error) {
            console.error('Error fetching workouts:', error);
            return workouts;
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

    const handleDeleteWorkout = async (id) => {
        try {
            const response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            alert(data.message);
    
            // Update the UI by filtering out the deleted workout
            setWorkouts(workouts.filter((workout) => workout._id !== id));
        } catch (error) {
            console.error('Error deleting workout:', error);
            alert('Error deleting workout. Please try again.');
        }
    };
    

    const resetForm = () => {
        setWorkoutName('');
        setWeight('');
        setRepetitions('');
        setSets('');
        setGroupName('');
        setIsEditing(false);
        setEditingIndex(null);
        setIsModalOpen(false);
    };

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        acc[workout.group] = acc[workout.group] || [];
        acc[workout.group].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Workout Tracker</h1>

            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-200"
            >
                Add Workout
            </button>

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
                                onClick={resetForm}
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
                                    <li key={workout._id} className="p-2 bg-gray-700 rounded flex justify-between items-center">
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
    onClick={() => handleDeleteWorkout(workout._id)}
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

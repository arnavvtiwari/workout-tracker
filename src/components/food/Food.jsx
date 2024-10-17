import React, { useState } from 'react';

const Food = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [newFood, setNewFood] = useState({
        name: '',
        servings: '',
        mealType: ''
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFood(prevFood => ({
            ...prevFood,
            [name]: value
        }));
    };

    // Handle adding food to the list
    const addFood = () => {
        if (newFood.name && newFood.servings && newFood.mealType) {
            setFoodItems(prevItems => [...prevItems, newFood]);
            // Reset the input fields after adding the item
            setNewFood({ name: '', servings: '', mealType: '' });
        } else {
            alert('Please fill out all fields before adding.');
        }
    };

    // Group food items by meal type (Breakfast, Lunch, Dinner, etc.)
    const groupedFoodItems = foodItems.reduce((groups, food) => {
        const meal = food.mealType;
        if (!groups[meal]) {
            groups[meal] = [];
        }
        groups[meal].push(food);
        return groups;
    }, {});

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center">
            <header className="text-4xl font-bold mb-6 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInDown">
                Food Tracker
            </header>

            {/* Input Form */}
            <div className="mb-8">
                <input
                    type="text"
                    name="name"
                    value={newFood.name}
                    onChange={handleChange}
                    placeholder="Food Item"
                    className="mb-4 p-2 rounded bg-gray-800 text-white"
                />
                <input
                    type="number"
                    name="servings"
                    value={newFood.servings}
                    onChange={handleChange}
                    placeholder="Servings"
                    className="mb-4 p-2 rounded bg-gray-800 text-white"
                />
                <select
                    name="mealType"
                    value={newFood.mealType}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded bg-gray-800 text-white"
                >
                    <option value="" disabled>Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
                <button
                    onClick={addFood}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition duration-200 transform active:scale-95"
                >
                    Add Food
                </button>
            </div>

            {/* Grouped Food Items */}
            <div className="w-full max-w-lg">
                {Object.keys(groupedFoodItems).length > 0 ? (
                    Object.keys(groupedFoodItems).map(mealType => (
                        <div key={mealType} className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">{mealType}</h2>
                            <ul className="bg-gray-800 rounded p-4">
                                {groupedFoodItems[mealType].map((food, index) => (
                                    <li key={index} className="mb-2 flex justify-between">
                                        <span>{food.name} ({food.servings} servings)</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No food items added yet.</p>
                )}
            </div>
        </div>
    );
};

export default Food;

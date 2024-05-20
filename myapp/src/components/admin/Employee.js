import React, { useState } from 'react';

const Employee = (props) => {
    // State variable to store the employee name
    const [name, setName] = useState('');

    // Function to handle input change
    const handleChange = (e) => {
        // Update the name state with the new input value
        setName(e.target.value);
        // Log the updated name to the console
        console.log(name);
    };

    return (
        <div>
            {/* Displaying Employee component */}
            <p>Employee component</p>
            {/* Displaying the employee name */}
            <p>Employee Name: {name}</p>
            {/* Input field to enter employee name */}
            <input type='text' name='firstName' value={name} onChange={handleChange}></input>
        </div>
    );
};

export default Employee;

'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Select, MenuItem } from '@mui/material';

export default function SignupPage() {
    const router = useRouter();
    const [formState, setFormState] = React.useState({
        userName: '',
        password: '',
        country: '',
        email: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            username: formState.userName,
            password: formState.password,
            email: formState.email,
            country: formState.country
        };

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Signup successful!');
            router.push('/login');
        } else {
            // Handle error response
            const result = await response.json();
            alert(`Signup failed: ${result.error}`);
        }
    };

    const validateForm = () => {
        return formState.userName.length > 0 && formState.password.length > 0 && formState.country.length > 0 && formState.email.length > 0;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form method="POST" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input id="username" name="username" type="text" required value={formState.userName} onChange={(e) => setFormState({...formState, userName: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input id="email" name="email" type="email" required value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input id="password" name="password" type="password" required value={formState.password} onChange={(e) => setFormState({...formState, password: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
                        <Select
                            id="country"
                            value={formState.country}
                            onChange={(e) => setFormState({...formState, country: e.target.value})}
                            className="w-full mt-1"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                            <MenuItem value="Mexico">Mexico</MenuItem>
                            {/* Add more countries as needed */}
                        </Select>
                    </div>
                    <div>
                        <button disabled={!validateForm()} type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
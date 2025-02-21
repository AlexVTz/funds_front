import React from 'react';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import { parseBody } from '@/utils/util';

interface SignInProps {
    error: string | null;
}

const SignIn: React.FC<SignInProps> = ({ error }) => {
    return (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100`}>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Log In</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="space-y-4" method="POST" action="/login">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            User name
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    if (context.req.method === 'POST') {
        const body : any = await parseBody(context.req);
        const { username, password } = body;

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();

        if (response.ok) {
            context.res.setHeader('Set-Cookie', cookie.serialize('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60, //* 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
            }));
            
            return {
                redirect: {
                    destination: '/welcome',
                    permanent: false,
                },
            };
        } else {
            return {
                props: {
                    error: result.error || 'Login failed',
                },
            };
        }
    }

    return {
        props: {
            error: null,
        },
    };
};

export default SignIn;
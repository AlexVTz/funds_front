
export const fetchUser = async () => {
    const response = await fetch('/api/profile', {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
};
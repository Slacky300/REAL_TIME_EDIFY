export const setLocalStorageWithExpiry = (key, data, expirationMinutes) => {
    const now = new Date();
    const item = {
        data: data,
        expiry: now.getTime() + expirationMinutes * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

export const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.data;
}


export const login = async (user) => {

    try {


        const { email, password } = user;

        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL || '/api/v1' }/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })

        });
        const data = await res.json();
        if (res.status === 200) {

            setLocalStorageWithExpiry('auth', data, 60); // 60 minutes expiration
            return { status: 200, user: data.user, token: data.token, message: data.message };
        }
        return { status: 500, message: data.message };

    } catch (error) {
        console.log(error);
    }
}

export const register = async (user) => {

    try {

        const { username, email, password } = user;

        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL || '/api/v1' }/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })

        });
        const data = await res.json();
        if (res.status === 201) {
            return { status: 201, message: data.message };
        }
        return { status: 400, message: data.message };
    } catch (error) {
        return { status: 500, message: error.message };
    }
}

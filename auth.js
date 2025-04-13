// auth.js
class AuthService {
    constructor() {
        this.API_URL = 'https://vas-backend.cz/api';
        this.TOKEN_KEY = 'kotak_os_token';
    }

    async login(username, password, rememberMe) {
        try {
            const response = await fetch(`${this.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Přihlášení selhalo');

            const data = await response.json();
            
            if (rememberMe) {
                localStorage.setItem(this.TOKEN_KEY, data.token);
            } else {
                sessionStorage.setItem(this.TOKEN_KEY, data.token);
            }
            
            return true;
        } catch (error) {
            console.error('Chyba při přihlašování:', error);
            return false;
        }
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
    }

    isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY) || !!sessionStorage.getItem(this.TOKEN_KEY);
    }

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    }
}

export const authService = new AuthService();
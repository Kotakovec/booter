// app.js
import { authService } from './auth.js';

class KotakOS {
    constructor() {
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.checkAuthState();
        this.loadModules();
    }

    setupEventListeners() {
        // Přihlašovací formulář
        document.getElementById('loginBtn')?.addEventListener('click', this.handleLogin.bind(this));
        
        // Odhlášení
        document.getElementById('logoutBtn')?.addEventListener('click', this.handleLogout.bind(this));
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        const success = await authService.login(username, password, rememberMe);
        
        if (success) {
            this.showSecuredContent();
        } else {
            this.showError('Nesprávné přihlašovací údaje');
        }
    }

    handleLogout() {
        authService.logout();
        this.showLoginForm();
    }

    checkAuthState() {
        if (authService.isAuthenticated()) {
            this.showSecuredContent();
        } else {
            this.showLoginForm();
        }
    }

    showSecuredContent() {
        // Načte hlavní dashboard aplikace
        this.loadView('dashboard');
    }

    showLoginForm() {
        // Zobrazí přihlašovací formulář
        this.loadView('login');
    }

    showError(message) {
        // Zobrazí chybovou zprávu
        const errorElement = document.getElementById('errorMsg');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    async loadView(viewName) {
        // Dynamické načítání jednotlivých stránek
        try {
            const response = await fetch(`views/${viewName}.html`);
            const html = await response.text();
            document.getElementById('app').innerHTML = html;
            
            // Po načtení view znovu nastavíme event listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Chyba při načítání view:', error);
        }
    }

    loadModules() {
        // Lazy loading modulů aplikace
        import('./modules/dashboard.js');
        import('./modules/files.js');
        import('./modules/settings.js');
    }
}

// Spuštění aplikace
document.addEventListener('DOMContentLoaded', () => {
    const app = new KotakOS();
});
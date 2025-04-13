export class Dashboard {
    constructor() {
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
    }

    async loadUserData() {
        try {
            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${authService.getToken()}`
                }
            });
            const userData = await response.json();
            this.displayUserData(userData);
        } catch (error) {
            console.error('Chyba při načítání uživatelských dat:', error);
        }
    }

    displayUserData(data) {
        // Zobrazení dat na dashboardu
    }
}
// Hope Bridge Platform - Main Application JavaScript

// Global state management
class HopeBridgeApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'home';
        this.currentDashboardTab = 'overview';
        this.initialized = false;
        
        // Sample data from the provided JSON
        this.platformStats = {
            totalDonations: "₹2.5M+",
            ngoPartners: "150+",
            volunteers: "500+",
            itemsDonated: "10,000+"
        };

        this.sampleNGOs = [
            {
                id: 1,
                name: "Hope Children's Home",
                location: "Mumbai, Maharashtra",
                verified: true,
                description: "Supporting orphaned children with education and care",
                image: "https://via.placeholder.com/300x200?text=Hope+Children",
                needs: 3,
                totalSupported: 150
            },
            {
                id: 2,
                name: "Sunrise Educational Trust",
                location: "Delhi, NCR",
                verified: true,
                description: "Providing education to underprivileged children",
                image: "https://via.placeholder.com/300x200?text=Sunrise+Trust",
                needs: 2,
                totalSupported: 89
            },
            {
                id: 3,
                name: "Care Foundation",
                location: "Bangalore, Karnataka",
                verified: true,
                description: "Healthcare support for underprivileged communities",
                image: "https://via.placeholder.com/300x200?text=Care+Foundation",
                needs: 4,
                totalSupported: 200
            }
        ];

        this.sampleNeeds = [
            {
                id: 1,
                ngoId: 1,
                title: "Winter Clothing for 50 Children",
                category: "Clothing",
                priority: "Urgent",
                description: "Urgent need for warm clothes as winter approaches. We need jackets, sweaters, and blankets for children aged 5-15.",
                quantity: 50,
                fulfilled: 12,
                image: "https://via.placeholder.com/300x200?text=Winter+Clothes",
                datePosted: "2025-08-20",
                deadline: "2025-08-30",
                ngoName: "Hope Children's Home"
            },
            {
                id: 2,
                ngoId: 2,
                title: "School Books and Supplies",
                category: "Education",
                priority: "High",
                description: "Educational materials needed for new academic year including textbooks, notebooks, and stationery for 100 students.",
                quantity: 100,
                fulfilled: 25,
                image: "https://via.placeholder.com/300x200?text=School+Books",
                datePosted: "2025-08-19",
                deadline: "2025-09-01",
                ngoName: "Sunrise Educational Trust"
            },
            {
                id: 3,
                ngoId: 1,
                title: "Medical Supplies for Health Center",
                category: "Medical",
                priority: "Urgent",
                description: "Urgently needed medical supplies including first aid kits, medicines, and basic medical equipment.",
                quantity: 20,
                fulfilled: 5,
                image: "https://via.placeholder.com/300x200?text=Medical+Supplies",
                datePosted: "2025-08-18",
                deadline: "2025-08-25",
                ngoName: "Hope Children's Home"
            },
            {
                id: 4,
                ngoId: 3,
                title: "Food Packets for Homeless",
                category: "Food",
                priority: "Medium",
                description: "Nutritious meal packets needed for daily distribution to homeless individuals in the city.",
                quantity: 200,
                fulfilled: 150,
                image: "https://via.placeholder.com/300x200?text=Food+Packets",
                datePosted: "2025-08-17",
                deadline: "2025-08-27",
                ngoName: "Care Foundation"
            }
        ];

        // Initialize immediately if DOM is ready, otherwise wait
        this.initWhenReady();
    }

    initWhenReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('DOM loaded, initializing app...');
                this.init();
            });
        } else {
            console.log('DOM already ready, initializing app...');
            setTimeout(() => this.init(), 0);
        }
    }

    init() {
        if (this.initialized) return;
        
        console.log('Initializing Hope Bridge App...');
        
        try {
            this.loadUserData();
            this.bindEvents();
            this.renderInitialContent();
            this.updateStats();
            this.initialized = true;
            console.log('App initialized successfully');
        } catch (error) {
            console.error('Error during app initialization:', error);
        }
    }

    // Data Management
    loadUserData() {
        try {
            const userData = localStorage.getItem('hopeBridgeUser');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                this.updateAuthUI();
            }
            
            // Load additional data from localStorage if available
            const storedNeeds = localStorage.getItem('hopeBridgeNeeds');
            if (storedNeeds) {
                this.sampleNeeds = [...this.sampleNeeds, ...JSON.parse(storedNeeds)];
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    saveUserData() {
        try {
            if (this.currentUser) {
                localStorage.setItem('hopeBridgeUser', JSON.stringify(this.currentUser));
            }
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    saveNeedsData() {
        try {
            const additionalNeeds = this.sampleNeeds.filter(need => need.id > 4);
            localStorage.setItem('hopeBridgeNeeds', JSON.stringify(additionalNeeds));
        } catch (error) {
            console.error('Error saving needs data:', error);
        }
    }

    // Event Binding
    bindEvents() {
        console.log('Binding events...');

        // Navigation
        this.bindNavigationEvents();
        
        // Auth buttons
        this.bindAuthEvents();
        
        // Modal events
        this.bindModalEvents();
        
        // Form events
        this.bindFormEvents();
        
        // Hero and action buttons
        this.bindActionButtons();
        
        // Filter events
        this.bindFilterEvents();
        
        // Dashboard events
        this.bindDashboardEvents();
        
        // Global events
        this.bindGlobalEvents();

        console.log('All events bound successfully');
    }

    bindNavigationEvents() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        console.log(`Found ${navLinks.length} navigation links`);
        
        navLinks.forEach((link, index) => {
            const section = link.getAttribute('data-section');
            console.log(`Binding nav link ${index}: ${section}`);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Navigation clicked: ${section}`);
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        // Logo click to home
        const navBrand = document.querySelector('.nav-brand');
        if (navBrand) {
            navBrand.style.cursor = 'pointer';
            navBrand.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Logo clicked, navigating to home');
                this.navigateToSection('home');
            });
        }
    }

    bindAuthEvents() {
        // Auth buttons
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const dashboardBtn = document.getElementById('dashboardBtn');

        if (loginBtn) {
            console.log('Binding login button');
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login button clicked');
                this.openModal('loginModal');
            });
        }

        if (registerBtn) {
            console.log('Binding register button');
            registerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Register button clicked');
                this.openModal('registerModal');
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        if (dashboardBtn) {
            dashboardBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection('dashboard');
            });
        }
    }

    bindModalEvents() {
        // Modal close buttons
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    this.closeAllModals();
                }
            });
        });
    }

    bindFormEvents() {
        // Forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const postNeedForm = document.getElementById('postNeedForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        if (postNeedForm) {
            postNeedForm.addEventListener('submit', (e) => this.handlePostNeed(e));
        }
    }

    bindActionButtons() {
        // Hero buttons
        const browseNeedsBtn = document.getElementById('browseNeedsBtn');
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        const viewAllNeedsBtn = document.getElementById('viewAllNeedsBtn');

        if (browseNeedsBtn) {
            console.log('Binding browse needs button');
            browseNeedsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Browse needs button clicked');
                this.navigateToSection('needs');
            });
        }

        if (learnMoreBtn) {
            console.log('Binding learn more button');
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Learn more button clicked');
                this.navigateToSection('about');
            });
        }

        if (viewAllNeedsBtn) {
            console.log('Binding view all needs button');
            viewAllNeedsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('View all needs button clicked');
                this.navigateToSection('needs');
            });
        }
    }

    bindFilterEvents() {
        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        const priorityFilter = document.getElementById('priorityFilter');
        const searchInput = document.getElementById('searchInput');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterNeeds());
        }

        if (priorityFilter) {
            priorityFilter.addEventListener('change', () => this.filterNeeds());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterNeeds());
        }
    }

    bindDashboardEvents() {
        // Dashboard tabs
        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchDashboardTab(tabName);
            });
        });
    }

    bindGlobalEvents() {
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // Navigation
    navigateToSection(sectionName) {
        console.log(`Navigating to section: ${sectionName}`);
        
        try {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Show target section
            const targetSection = document.getElementById(`${sectionName}Section`);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log(`Section ${sectionName} is now active`);
            } else {
                console.error(`Section ${sectionName} not found`);
            }

            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === sectionName) {
                    link.classList.add('active');
                }
            });

            this.currentSection = sectionName;

            // Load section-specific content
            if (sectionName === 'needs') {
                this.renderNeedsGrid();
            } else if (sectionName === 'ngos') {
                this.renderNGOsGrid();
            } else if (sectionName === 'dashboard') {
                this.renderDashboard();
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error navigating to section:', error);
        }
    }

    // Authentication
    handleLogin(e) {
        e.preventDefault();
        console.log('Handling login...');
        
        try {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simple demo authentication
            if (email && password) {
                this.currentUser = {
                    id: Date.now(),
                    name: email.split('@')[0],
                    email: email,
                    role: 'donor' // Default role for demo
                };
                
                this.saveUserData();
                this.updateAuthUI();
                this.closeAllModals();
                this.showToast('Login successful!', 'success');
                this.navigateToSection('dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showToast('Login failed. Please try again.', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        console.log('Handling registration...');
        
        try {
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('userRole').value;

            if (name && email && password && role) {
                this.currentUser = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    role: role
                };
                
                this.saveUserData();
                this.updateAuthUI();
                this.closeAllModals();
                this.showToast('Registration successful!', 'success');
                this.navigateToSection('dashboard');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showToast('Registration failed. Please try again.', 'error');
        }
    }

    logout() {
        try {
            this.currentUser = null;
            localStorage.removeItem('hopeBridgeUser');
            this.updateAuthUI();
            this.navigateToSection('home');
            this.showToast('Logged out successfully', 'success');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    updateAuthUI() {
        try {
            const authButtons = document.querySelector('.nav-menu');
            const userMenu = document.querySelector('.nav-user-menu');

            if (this.currentUser) {
                if (authButtons) authButtons.classList.add('hidden');
                if (userMenu) userMenu.classList.remove('hidden');
                const userName = document.querySelector('.user-name');
                if (userName) userName.textContent = this.currentUser.name;
            } else {
                if (authButtons) authButtons.classList.remove('hidden');
                if (userMenu) userMenu.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error updating auth UI:', error);
        }
    }

    // Modal Management
    openModal(modalId) {
        console.log(`Opening modal: ${modalId}`);
        
        try {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                console.log(`Modal ${modalId} opened`);
            } else {
                console.error(`Modal ${modalId} not found`);
            }
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }

    closeAllModals() {
        try {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        } catch (error) {
            console.error('Error closing modals:', error);
        }
    }

    // Content Rendering
    renderInitialContent() {
        console.log('Rendering initial content...');
        this.renderFeaturedNeeds();
        this.renderNGOsGrid();
    }

    renderFeaturedNeeds() {
        try {
            const container = document.getElementById('featuredNeedsGrid');
            if (!container) {
                console.error('Featured needs container not found');
                return;
            }

            const featuredNeeds = this.sampleNeeds.slice(0, 3);
            container.innerHTML = featuredNeeds.map(need => this.createNeedCard(need)).join('');
            console.log('Featured needs rendered');
        } catch (error) {
            console.error('Error rendering featured needs:', error);
        }
    }

    renderNeedsGrid(filteredNeeds = null) {
        try {
            const container = document.getElementById('needsGrid');
            if (!container) return;

            const needsToRender = filteredNeeds || this.sampleNeeds;
            
            if (needsToRender.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <h3>No needs found</h3>
                        <p>Try adjusting your filters or check back later.</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = needsToRender.map(need => this.createNeedCard(need)).join('');
        } catch (error) {
            console.error('Error rendering needs grid:', error);
        }
    }

    renderNGOsGrid() {
        try {
            const container = document.getElementById('ngosGrid');
            if (!container) return;

            container.innerHTML = this.sampleNGOs.map(ngo => this.createNGOCard(ngo)).join('');
        } catch (error) {
            console.error('Error rendering NGOs grid:', error);
        }
    }

    createNeedCard(need) {
        const progressPercent = (need.fulfilled / need.quantity) * 100;
        const ngo = this.sampleNGOs.find(ngo => ngo.id === need.ngoId);
        
        return `
            <div class="need-card animate-slide-up">
                <div class="need-image">
                    📦 ${need.category}
                </div>
                <div class="need-content">
                    <div class="need-header">
                        <h3 class="need-title">${need.title}</h3>
                        <span class="priority-badge priority-${need.priority.toLowerCase()}">${need.priority}</span>
                    </div>
                    <div class="need-category">📍 ${ngo ? ngo.name : need.ngoName}</div>
                    <p class="need-description">${need.description}</p>
                    <div class="need-progress">
                        <div class="progress-label">
                            <span>Progress</span>
                            <span>${need.fulfilled}/${need.quantity}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                    </div>
                    <div class="need-actions">
                        <button class="btn btn--primary btn--sm view-details-btn" data-need-id="${need.id}">View Details</button>
                        <button class="btn btn--donate btn--sm donate-btn" data-need-id="${need.id}">Donate</button>
                    </div>
                </div>
            </div>
        `;
    }

    createNGOCard(ngo) {
        return `
            <div class="ngo-card animate-slide-up">
                <div class="ngo-header">
                    <h3 class="ngo-name">${ngo.name}</h3>
                    ${ngo.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                </div>
                <div class="ngo-location">📍 ${ngo.location}</div>
                <p class="ngo-description">${ngo.description}</p>
                <div class="ngo-stats">
                    <span>Active Needs: ${ngo.needs}</span>
                    <span>Supported: ${ngo.totalSupported}</span>
                </div>
            </div>
        `;
    }

    // Need Management
    viewNeedDetails(needId) {
        console.log(`Viewing need details for ID: ${needId}`);
        
        try {
            const need = this.sampleNeeds.find(n => n.id == needId);
            if (!need) {
                console.error(`Need with ID ${needId} not found`);
                return;
            }

            const ngo = this.sampleNGOs.find(ngo => ngo.id === need.ngoId);
            const progressPercent = (need.fulfilled / need.quantity) * 100;

            document.getElementById('needDetailsTitle').textContent = need.title;
            document.getElementById('needDetailsContent').innerHTML = `
                <div class="need-details">
                    <div class="need-image">📦 ${need.category}</div>
                    <div class="need-info">
                        <div class="need-meta">
                            <span class="priority-badge priority-${need.priority.toLowerCase()}">${need.priority}</span>
                            <span class="need-category">Category: ${need.category}</span>
                        </div>
                        <p><strong>Organization:</strong> ${ngo ? ngo.name : need.ngoName}</p>
                        <p><strong>Location:</strong> ${ngo ? ngo.location : 'Location not available'}</p>
                        <p><strong>Description:</strong> ${need.description}</p>
                        <p><strong>Deadline:</strong> ${new Date(need.deadline).toLocaleDateString()}</p>
                        
                        <div class="need-progress">
                            <div class="progress-label">
                                <span>Progress: ${need.fulfilled}/${need.quantity} (${Math.round(progressPercent)}%)</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                        
                        <div class="need-actions" style="margin-top: 20px;">
                            <button class="btn btn--primary donate-btn" data-need-id="${need.id}">Donate Now</button>
                            <button class="btn btn--outline">Share</button>
                        </div>
                    </div>
                </div>
            `;
            
            this.openModal('needDetailsModal');
        } catch (error) {
            console.error('Error viewing need details:', error);
        }
    }

    donateToNeed(needId) {
        console.log(`Donating to need ID: ${needId}`);
        
        try {
            if (!this.currentUser) {
                this.showToast('Please login to donate', 'error');
                this.openModal('loginModal');
                return;
            }

            const need = this.sampleNeeds.find(n => n.id == needId);
            if (!need) return;

            // Simulate donation
            const donationAmount = Math.min(5, need.quantity - need.fulfilled);
            need.fulfilled += donationAmount;
            
            this.saveNeedsData();
            this.showToast(`Thank you for your donation! ${donationAmount} items contributed.`, 'success');
            
            // Refresh current view
            if (this.currentSection === 'needs') {
                this.renderNeedsGrid();
            } else if (this.currentSection === 'home') {
                this.renderFeaturedNeeds();
            }
            
            this.closeAllModals();
        } catch (error) {
            console.error('Error donating to need:', error);
            this.showToast('Donation failed. Please try again.', 'error');
        }
    }

    // Utility Functions
    updateStats() {
        try {
            const totalDonations = document.getElementById('totalDonations');
            const ngoPartners = document.getElementById('ngoPartners');
            const volunteers = document.getElementById('volunteers');
            const itemsDonated = document.getElementById('itemsDonated');

            if (totalDonations) totalDonations.textContent = this.platformStats.totalDonations;
            if (ngoPartners) ngoPartners.textContent = this.platformStats.ngoPartners;
            if (volunteers) volunteers.textContent = this.platformStats.volunteers;
            if (itemsDonated) itemsDonated.textContent = this.platformStats.itemsDonated;
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    showToast(message, type = 'success') {
        try {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            if (toast && toastMessage) {
                toastMessage.textContent = message;
                toast.className = `toast ${type}`;
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        } catch (error) {
            console.error('Error showing toast:', error);
        }
    }

    // Event delegation for dynamically created buttons
    setupEventDelegation() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.view-details-btn')) {
                e.preventDefault();
                const needId = e.target.getAttribute('data-need-id');
                this.viewNeedDetails(needId);
            }
            
            if (e.target.matches('.donate-btn')) {
                e.preventDefault();
                const needId = e.target.getAttribute('data-need-id');
                this.donateToNeed(needId);
            }
        });
    }

    // Dashboard and other methods (abbreviated for space)
    renderDashboard() {
        if (!this.currentUser) {
            this.navigateToSection('home');
            this.showToast('Please login to access dashboard', 'error');
            return;
        }
        // Dashboard rendering logic...
    }

    filterNeeds() {
        // Filter logic...
    }

    handlePostNeed(e) {
        // Post need logic...
    }

    switchDashboardTab(tabName) {
        // Tab switching logic...
    }
}

// Initialize the application
let app;

// Ensure proper initialization
function initializeApp() {
    if (!app) {
        console.log('Creating new app instance...');
        app = new HopeBridgeApp();
        
        // Setup event delegation after app is created
        setTimeout(() => {
            if (app.setupEventDelegation) {
                app.setupEventDelegation();
            }
        }, 100);
        
        // Make app globally accessible
        window.app = app;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Fallback initialization
window.addEventListener('load', () => {
    if (!app) {
        console.log('Fallback initialization...');
        initializeApp();
    }
});

// Add event delegation at document level as backup
document.addEventListener('click', function(e) {
    // Handle need card buttons
    if (e.target.matches('.view-details-btn')) {
        e.preventDefault();
        const needId = e.target.getAttribute('data-need-id');
        if (window.app) {
            console.log('Event delegation: viewing details for need', needId);
            window.app.viewNeedDetails(needId);
        }
    }
    
    if (e.target.matches('.donate-btn')) {
        e.preventDefault();
        const needId = e.target.getAttribute('data-need-id');
        if (window.app) {
            console.log('Event delegation: donating to need', needId);
            window.app.donateToNeed(needId);
        }
    }
});

// Add additional CSS for activity items and need details
const additionalStyles = `
.activity-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-12);
    padding: var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    background: var(--color-background);
}

.activity-item span {
    font-size: var(--font-size-lg);
}

.activity-item div {
    flex: 1;
}

.activity-item strong {
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
}

.activity-item p {
    color: var(--color-text-secondary);
    margin: var(--space-4) 0 0 0;
    font-size: var(--font-size-sm);
}

.need-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-20);
}

.need-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
}

.need-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    align-items: center;
}

@media (max-width: 768px) {
    .need-details {
        grid-template-columns: 1fr;
    }
}
`;

// Inject additional styles when DOM is ready
function injectStyles() {
    if (document.head && !document.getElementById('additional-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'additional-styles';
        styleSheet.textContent = additionalStyles;
        document.head.appendChild(styleSheet);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyles);
} else {
    injectStyles();
}
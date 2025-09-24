// All main JS functions and logic extracted from index.html
// Global variables
let currentUser = null;
let userRole = null;
let html5QrCode = null;

// Authentication and Role Management
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('userRole').value;
    if (username && password && role) {
        currentUser = username;
        userRole = role;
        document.getElementById('loginModal').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        document.getElementById('currentUser').textContent = `Welcome, ${username}`;
        document.getElementById('userRoleBadge').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        applyRolePermissions();
        initializeCharts();
    }
});

function logout() {
    currentUser = null;
    userRole = null;
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginForm').reset();
    if (html5QrCode) {
        html5QrCode.stop();
    }
}

function applyRolePermissions() {
    const restrictedElements = document.querySelectorAll('[data-role]');
    restrictedElements.forEach(element => {
        const allowedRoles = element.getAttribute('data-role').split(',');
        if (allowedRoles.includes(userRole)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Portal Navigation
function switchPortal(portalName) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    document.querySelectorAll('.portal-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(portalName + '-portal').classList.add('active');
    if (portalName === 'scanner') {
        initializeQRScanner();
    }
}

// UDM Sub-Portal Navigation
function switchUDMSection(sectionName) {
    document.querySelectorAll('#udm-portal .sub-nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    document.querySelectorAll('#udm-portal .portal-subsection').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('udm-' + sectionName).classList.add('active');
    if (sectionName === 'track-fitting') {
        initializeFittingChart();
    } else if (sectionName === 'inventory') {
        initializeStockChart();
    } else if (sectionName === 'reports') {
        initializeReportChart();
    }
}

// TMS Sub-Portal Navigation
function switchTMSSection(sectionName) {
    document.querySelectorAll('#tms-portal .sub-nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    document.querySelectorAll('#tms-portal .portal-subsection').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('tms-' + sectionName).classList.add('active');
    if (sectionName === 'track-inventory') {
        initializeComponentChart();
    } else if (sectionName === 'vendor-materials') {
        initializeVendorChart();
    } else if (sectionName === 'user-management') {
        initializeUserRoleChart();
    }
}

// ...existing code for all chart, QR, and utility functions...
// Main Dashboard Charts Initialization
function initializeCharts() {
    // Asset Overview Chart
    const assetCtx = document.getElementById('assetChart');
    if (assetCtx) {
        new Chart(assetCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Maintenance', 'Inactive'],
                datasets: [{
                    data: [1189, 42, 16],
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Asset Performance %',
                    data: [95, 97, 94, 98, 96, 99],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: false, min: 90, max: 100 } }
            }
        });
    }

    // Track Conditions Chart (TMS)
    const trackCtx = document.getElementById('trackChart');
    if (trackCtx) {
        new Chart(trackCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Excellent', 'Good', 'Fair', 'Poor'],
                datasets: [{
                    label: 'Track Sections',
                    data: [45, 67, 23, 8],
                    backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // Inventory Chart (TMS)
    const inventoryCtx = document.getElementById('inventoryChart');
    if (inventoryCtx) {
        new Chart(inventoryCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Rails', 'Sleepers', 'Fasteners', 'Signals', 'Other'],
                datasets: [{
                    data: [890, 654, 432, 234, 246],
                    backgroundColor: ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

// UDM Track Fitting Chart
function initializeFittingChart() {
    const fittingCtx = document.getElementById('fittingChart');
    if (fittingCtx) {
        new Chart(fittingCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Rail Joint', 'Fish Plate', 'Rail Clip', 'Sleeper Plate', 'Bolt & Nut'],
                datasets: [{
                    data: [85, 67, 142, 98, 56],
                    backgroundColor: ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

// UDM Inventory Stock Chart
function initializeStockChart() {
    const stockCtx = document.getElementById('stockChart');
    if (stockCtx) {
        new Chart(stockCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Rails', 'Sleepers', 'Fasteners', 'Signals', 'Switches'],
                datasets: [{
                    label: 'Stock Level',
                    data: [75, 45, 90, 60, 80],
                    backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#667eea', '#f093fb']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
}

// UDM Reports Analytics Chart (already present as initializeReportChart)

// TMS Track Inventory Component Chart
function initializeComponentChart() {
    const componentCtx = document.getElementById('componentChart');
    if (componentCtx) {
        new Chart(componentCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Rail Sections', 'Switch Points', 'Signal Posts', 'Crossings', 'Buffer Stops'],
                datasets: [{
                    data: [756, 234, 857, 156, 89],
                    backgroundColor: ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

// TMS Vendor Performance Chart
function initializeVendorChart() {
    const vendorCtx = document.getElementById('vendorChart');
    if (vendorCtx) {
        new Chart(vendorCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Quality', 'Delivery Time', 'Price', 'Support', 'Reliability'],
                datasets: [{
                    label: 'Vendor Performance',
                    data: [85, 78, 92, 88, 95],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    pointBackgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { r: { beginAtZero: true, max: 100 } }
            }
        });
    }
}

// TMS User Role Distribution Chart
function initializeUserRoleChart() {
    const userRoleCtx = document.getElementById('userRoleChart');
    if (userRoleCtx) {
        new Chart(userRoleCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Administrator', 'Operator', 'Viewer', 'Maintenance'],
                datasets: [{
                    label: 'Number of Users',
                    data: [8, 45, 67, 36],
                    backgroundColor: ['#dc3545', '#667eea', '#28a745', '#ffc107']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}
// Report Analytics Chart for UDM Reports Section
function initializeReportChart() {
    const ctx = document.getElementById('reportChart');
    if (!ctx) return;
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Asset Summary', 'Maintenance Log', 'Inventory Status', 'Track Fitting', 'Performance'],
            datasets: [{
                label: 'Reports Generated',
                data: [12, 8, 15, 6, 10],
                backgroundColor: [
                    '#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffc107'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
// (The rest of the JS logic from the inline script should be placed here, as previously extracted)

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('userRole').value;
        if (username && password && role) {
            currentUser = username;
            userRole = role;
            document.getElementById('loginModal').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            document.getElementById('currentUser').textContent = `Welcome, ${username}`;
            document.getElementById('userRoleBadge').textContent = role.charAt(0).toUpperCase() + role.slice(1);
            applyRolePermissions();
            initializeCharts();
        }
    });
});

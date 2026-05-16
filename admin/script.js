// Check for authentication first
if (localStorage.getItem('xlnz_auth') !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    checkForNewLeads();
});

async function checkForNewLeads() {
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6a08a1a7c0954111d832768e/latest', {
            headers: {
                'X-Master-Key': '$2a$10$DIDTNo9812iTDmYoKNt9euy2/qeLt2djvOiGqrm.1g01zJJdqGppS'
            }
        });
        const data = await response.json();
        const leads = data.record || [];
        displayLeads(leads);
    } catch (error) {
        console.error('Failed to fetch leads:', error);
        const container = document.getElementById('leadContainer');
        container.innerHTML = '<div class="no-leads">Error loading leads. Check console for details.</div>';
    }
}

function displayLeads(leads) {
    const container = document.getElementById('leadContainer');
    
    if (leads.length === 0) {
        container.innerHTML = '<div class="no-leads">No new leads yet. This dashboard will update when a contact form is submitted.</div>';
        return;
    }
    
    container.innerHTML = leads.map(lead => `
        <div class="lead-card">
            <h3>${lead.name}</h3>
            <div class="meta">${lead.email} • ${lead.phone}</div>
            <p><strong>Company:</strong> ${lead.company}</p>
            <p><strong>Message:</strong> ${lead.message}</p>
            <div class="meta">${lead.date}</div>
            <span class="status new">New</span>
        </div>
    `).join('');
}

if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('xlnz_auth');
    window.location.href = 'login.html';
});
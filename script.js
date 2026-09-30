// Get all checkboxes
const checkboxes = document.querySelectorAll('.item-checkbox input[type="checkbox"]');
const totalItems = document.getElementById('total-items');
const checkedItemsCount = document.getElementById('checked-items');
const progressPercentage = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');

// Function to update stats
function updateStats() {
    const checked = document.querySelectorAll('.item-checkbox input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);

    checkedItemsCount.textContent = checked;
    progressPercentage.textContent = percentage + '%';
    progressFill.style.width = percentage + '%';

    // Save to localStorage
    localStorage.setItem('babyRegistryProgress', JSON.stringify({
        checked: checked,
        total: total,
        percentage: percentage,
        timestamp: new Date().toISOString()
    }));
}

// Add event listeners to all checkboxes
checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
        const itemCard = this.closest('.item');
        
        if (this.checked) {
            itemCard.classList.add('checked');
        } else {
            itemCard.classList.remove('checked');
        }
        
        updateStats();
    });

    // Load saved state from localStorage
    const savedState = localStorage.getItem(`item-${index}`);
    if (savedState === 'true') {
        checkbox.checked = true;
        checkbox.closest('.item').classList.add('checked');
    }
});

// Update stats on page load
updateStats();

// Add keyboard shortcut info
document.addEventListener('keydown', function(e) {
    if (e.key === 'r') {
        // Reset all checkboxes with 'r' key
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.item').classList.remove('checked');
        });
        updateStats();
    }
});

// Save individual checkbox state
checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
        localStorage.setItem(`item-${index}`, this.checked);
    });
});
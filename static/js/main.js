let educationCount = 0;
let experienceCount = 0;

function addEducation() {
    const container = document.getElementById('educationContainer');
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm remove-btn" onclick="this.parentElement.remove()">Remove</button>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Institution</label>
                <input type="text" class="form-control" name="education[${educationCount}][institution]" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Degree</label>
                <input type="text" class="form-control" name="education[${educationCount}][degree]" required>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input type="month" class="form-control" name="education[${educationCount}][startDate]" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input type="month" class="form-control" name="education[${educationCount}][endDate]">
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" name="education[${educationCount}][description]" rows="2"></textarea>
        </div>
    `;
    container.appendChild(educationEntry);
    educationCount++;
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const experienceEntry = document.createElement('div');
    experienceEntry.className = 'experience-entry';
    experienceEntry.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm remove-btn" onclick="this.parentElement.remove()">Remove</button>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Company</label>
                <input type="text" class="form-control" name="experience[${experienceCount}][company]" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Position</label>
                <input type="text" class="form-control" name="experience[${experienceCount}][position]" required>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input type="month" class="form-control" name="experience[${experienceCount}][startDate]" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input type="month" class="form-control" name="experience[${experienceCount}][endDate]">
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" name="experience[${experienceCount}][description]" rows="3"></textarea>
        </div>
    `;
    container.appendChild(experienceEntry);
    experienceCount++;
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now().toString(),
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value
        },
        education: Array.from(document.getElementsByClassName('education-entry')).map(entry => ({
            institution: entry.querySelector('input[name$="[institution]"]').value,
            degree: entry.querySelector('input[name$="[degree]"]').value,
            startDate: entry.querySelector('input[name$="[startDate]"]').value,
            endDate: entry.querySelector('input[name$="[endDate]"]').value,
            description: entry.querySelector('textarea[name$="[description]"]').value
        })),
        experience: Array.from(document.getElementsByClassName('experience-entry')).map(entry => ({
            company: entry.querySelector('input[name$="[company]"]').value,
            position: entry.querySelector('input[name$="[position]"]').value,
            startDate: entry.querySelector('input[name$="[startDate]"]').value,
            endDate: entry.querySelector('input[name$="[endDate]"]').value,
            description: entry.querySelector('textarea[name$="[description]"]').value
        })),
        skills: document.getElementById('skills').value.split(',').map(skill => skill.trim())
    };

    fetch('/save_resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Resume saved successfully!');
            // You can add code here to redirect to a preview page
        } else {
            alert('Error saving resume: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving resume. Please try again.');
    });
});

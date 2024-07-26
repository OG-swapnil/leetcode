async function fetchProfile() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value.trim();

    if (username === '') {
        alert('Please enter a username');
        return;
    }

    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const profileData = await response.json();
        if (profileData.error) {
            throw new Error(profileData.error);
        }

        displayProfile(profileData);
    } catch (error) {
        alert('Error fetching profile data: ' + error.message);
    }
}

function displayProfile(profile) {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
        <h2>Profile: ${profile.username}</h2>
        <p><strong>Problems Solved:</strong> ${profile.totalSolved}</p>
        <p><strong>Total Problems:</strong> ${profile.totalQuestions}</p>
        <p><strong>Easy:</strong> ${profile.easySolved}<strong>/</strong>${profile.totalEasy}</p>
        <p><strong>Medium:</strong> ${profile.mediumSolved}<strong>/</strong>${profile.totalMedium}</p>
        <p><strong>Hard:</strong> ${profile.hardSolved}<strong>/</strong>${profile.totalHard}</p>
        <p><strong>Ranking:</strong> ${profile.ranking}</p>
        <p><strong>Submission:</strong> ${profile.submissionCalendar}</p>
    `;
}

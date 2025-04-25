document.addEventListener('DOMContentLoaded', function() {
    const banner = document.createElement('div');
    banner.className = 'subscribe-banner';
    banner.innerHTML = `
        <div class="banner-content">
            <span class="close-button">&times;</span>
            <h3>Subscribe for updates</h3>
            <input type="email" placeholder="Enter your email" id="email-input" />
            <button id="subscribe-button">Subscribe</button>
            <p>Follow us on <a href="https://t.me/unknown_link_12345" target="_blank">Telegram</a></p>
        </div>
    `;

    document.body.appendChild(banner);

    document.querySelector('.close-button').addEventListener('click', function() {
        banner.style.display = 'none';
    });

    document.getElementById('subscribe-button').addEventListener('click', function() {
        const email = document.getElementById('email-input').value;
        if (email) {
            alert(`Thank you for subscribing! We will send updates to ${email}`);
        } else {
            alert('Please enter your email🥺');
        }
    });
});

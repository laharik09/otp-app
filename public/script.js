let generatedOTP = "";

function sendOTP() {
    const email = document.getElementById("email").value;

    fetch('/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            generatedOTP = data.otp;
            document.getElementById("verify-section").style.display = "block";
        });
}

function verifyOTP() {
    const otp = document.getElementById("otp").value;
    if (otp === generatedOTP) {
        alert("✅ Email verified successfully!");
    } else {
        alert("❌ Invalid OTP");
    }
}
/*function verifyOTP() {
    const email = document.getElementById("email").value;
    const otp = document.getElementById("otp").value;

    fetch('/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.body.innerHTML = `
        <div style="height:100vh;display:flex;justify-content:center;align-items:center;flex-direction:column;background:#d4edda">
          <h1 style="color:#155724;font-size:2rem;">✅ Email Verified!</h1>
          <p style="color:#155724;font-size:1.2rem;">Thank you</p>
        </div>
      `;
            } else {
                showMessage(data.message || "Invalid OTP", "error");
            }
        })
        .catch(() => showMessage("Verification failed", "error"));
}

function showMessage(text, type = "success") {
    const message = document.getElementById("message");
    message.textContent = text;
    message.className = type;
    setTimeout(() => {
        message.textContent = "";
        message.className = "hidden";
    }, 4000);
}*/
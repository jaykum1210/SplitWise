// ELEMENTS
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const loginForm = document.querySelector("form");
const loginBtn = document.querySelector(".login-btn");
const eyeIcon = document.querySelector(".fa-eye, .fa-eye-slash");

// PASSWORD SHOW / HIDE
if (passwordInput && eyeIcon) {
    eyeIcon.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";

        eyeIcon.classList.toggle("fa-eye");
        eyeIcon.classList.toggle("fa-eye-slash");
    });
}

// LOGIN FORM VALIDATION
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Empty Fields
        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password Validation
        if (password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        // Loading Effect
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.classList.add("loading");

            setTimeout(() => {
                loginBtn.disabled = false;
                loginBtn.classList.remove("loading");
            }, 1000);
        }

        console.log("Email:", email);
        console.log("Password:", password);

        // TODO:
        // Send login request here
    });
}

// ENTER KEY SUBMIT
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && loginForm) {
        loginForm.requestSubmit();
    }
});

// PASSWORD TRIM SPACES
if (passwordInput) {
    passwordInput.addEventListener("input", () => {
        passwordInput.value = passwordInput.value.trimStart();
    });
}

// INPUT FOCUS EFFECT
document.querySelectorAll(".input-box input").forEach((input) => {

    input.addEventListener("focus", () => {
        input.parentElement.classList.add("active");
    });

    input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
            input.parentElement.classList.remove("active");
        }
    });

});
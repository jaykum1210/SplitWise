"use strict";

//DOM ELEMENTS

// Form
const signupForm = document.querySelector(".signup-form");

// Inputs
const fullNameInput = document.getElementById("fullName");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Checkbox
const termsCheckbox = document.getElementById("terms");

// Buttons
const signupButton = document.querySelector(".signup-btn");
const googleButton = document.querySelector(".google-btn");

// Password Toggle Icons
const passwordToggle = document.querySelector(".toggle-password");
const confirmPasswordToggle = document.querySelector(".toggle-confirm-password");

// Password Strength
const strengthBars = document.querySelectorAll(".strength-bars span");
const strengthText = document.querySelector(".strength-text");

// Password Match
const passwordMatch = document.querySelector(".password-match");

//AUTO FOCUS

window.addEventListener("DOMContentLoaded", () => {

    if (fullNameInput) {

        fullNameInput.focus();

    }

});

//PASSWORD SHOW / HIDE
function togglePassword(input, icon) {

    if (!input || !icon) return;
    const hidden = input.type === "password";

    input.type = hidden ? "text" : "password";

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");

}

if (passwordToggle) {

    passwordToggle.addEventListener("click", () => {
        togglePassword(passwordInput, passwordToggle);
    });

}

if (confirmPasswordToggle) {
    confirmPasswordToggle.addEventListener("click", () => {
        togglePassword(
            confirmPasswordInput,
            confirmPasswordToggle
        );
    });
}

//INPUT FOCUS EFFECT
document.querySelectorAll(".input-box input").forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("active");
    });

    input.addEventListener("blur", () => {
        if (input.value.trim() === "") {
            input.parentElement.classList.remove("active");
        }
    });
});

//VALID ICON
function updateValidIcon(input) {
    const icon = input.parentElement.querySelector(".valid-icon");
    if (!icon) return;
    if (input.value.trim() !== "") {
        icon.style.opacity = "1";
    }
    else {
        icon.style.opacity = "0";
    }
}
[
    fullNameInput,
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput
].forEach(input => {
    if (!input) return;
    input.addEventListener("input", () => {
        updateValidIcon(input);
    });
});

//EMAIL VALIDATION
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    if (!emailInput) return false;
    const email = emailInput.value.trim();
    if (email === "") {
        emailInput.parentElement.style.borderColor =
            "rgba(255,255,255,.08)";
        return false;
    }
    if (emailPattern.test(email)) {
        emailInput.parentElement.style.borderColor =
            "rgb(24,194,125)";
        return true;
    }

    emailInput.parentElement.style.borderColor = "#ef4444";
    return false;
}

if (emailInput) {
    emailInput.addEventListener(
        "input",
        validateEmail
    );
}

//USERNAME VALIDATION
const usernamePattern = /^[a-zA-Z0-9_.]{4,20}$/;
function validateUsername() {
    if (!usernameInput) return false;
    const username =
        usernameInput.value.trim();
    if (username === "") {
        usernameInput.parentElement.style.borderColor =
            "rgba(255,255,255,.08)";
        return false;
    }

    if (usernamePattern.test(username)) {
        usernameInput.parentElement.style.borderColor =
            "rgb(24,194,125)";
        return true;
    }

    usernameInput.parentElement.style.borderColor = "#ef4444";
    return false;
}

if (usernameInput) {
    usernameInput.addEventListener(
        "input",
        validateUsername
    );
}

// PASSWORD STRENGTH
function updateStrength(level, text) {

    strengthBars.forEach(bar => {
        bar.classList.remove("active");
    });
    for (let i = 0; i < level; i++) {
        strengthBars[i].classList.add("active");
    }
    strengthText.textContent = text;
}

function checkPasswordStrength() {
    if (!passwordInput) return;
    const password = passwordInput.value;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    switch (score) {
        case 0:
        case 1:
            updateStrength(
                1,
                "Weak"
            );
            break;
        case 2:
            updateStrength(
                2,
                "Fair"
            );
            break;
        case 3:
            updateStrength(
                3,
                "Good"
            );
            break;
        case 4:
            updateStrength(
                4,
                "Strong"
            );
            break;
    }
}

if (passwordInput) {
    passwordInput.addEventListener(
        "input",
        checkPasswordStrength
    );
}
//PASSWORD MATCH VALIDATION
function checkPasswordMatch() {
    if (!passwordInput || !confirmPasswordInput) return false;
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    // Hide if empty
    if (confirmPassword === "") {
        passwordMatch.style.display = "none";
        confirmPasswordInput.parentElement.style.borderColor =
            "rgba(255,255,255,.08)";
        return false;
    }

    // Match
    if (password === confirmPassword) {
        passwordMatch.style.display = "flex";
        passwordMatch.style.color = "rgb(24,194,125)";
        passwordMatch.querySelector("span").textContent = "Passwords match";
        confirmPasswordInput.parentElement.style.borderColor = "rgb(24,194,125)";
        return true;
    }

    // Not Match
    passwordMatch.style.display = "flex";
    passwordMatch.style.color = "#ef4444";
    passwordMatch.querySelector("span").textContent = "Passwords do not match";
    confirmPasswordInput.parentElement.style.borderColor = "#ef4444";
    return false;
}

if (passwordInput) {
    passwordInput.addEventListener(
        "input",
        checkPasswordMatch
    );
}

if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener(
        "input",
        checkPasswordMatch
    );
}

//ENABLE / DISABLE SIGNUP BUTTON
function validateForm() {
    const fullNameValid =
        fullNameInput.value.trim().length >= 3;

    const usernameValid =
        validateUsername();

    const emailValid =
        validateEmail();

    const passwordValid =
        passwordInput.value.length >= 8;

    const confirmValid =
        checkPasswordMatch();

    const termsAccepted =
        termsCheckbox.checked;

    const formValid =
        fullNameValid &&
        usernameValid &&
        emailValid &&
        passwordValid &&
        confirmValid &&
        termsAccepted;

    signupButton.disabled = !formValid;

    signupButton.style.opacity =
        formValid ? "1" : ".6";

    signupButton.style.cursor =
        formValid ? "pointer" : "not-allowed";

}

[
    fullNameInput,
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    termsCheckbox

].forEach(element => {

    if (!element) return;

    element.addEventListener(
        "input",
        validateForm
    );

    element.addEventListener(
        "change",
        validateForm
    );
});

//FORM SUBMIT

if (signupForm) {
    signupForm.addEventListener(
        "submit",
        function (e) {
            e.preventDefault();
            validateForm();
            if (signupButton.disabled) {
                alert(
                    "Please complete all required fields correctly."
                );
                return;
            }
            console.log({
                fullName:
                    fullNameInput.value.trim(),
                username:
                    usernameInput.value.trim(),
                email:
                    emailInput.value.trim(),
                password:
                    passwordInput.value
            });
        }
    );
}

// INITIAL STATE
if (passwordMatch) {
    passwordMatch.style.display = "none";
}

if (signupButton) {
    signupButton.disabled = true;
    signupButton.style.opacity = ".6";
    signupButton.style.cursor = "not-allowed";
}

validateForm();

//LOADING BUTTON EFFECT
function startLoading() {
    signupButton.disabled = true;
    signupButton.dataset.originalText = signupButton.innerHTML;

    signupButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Creating Account...</span>
    `;
}

function stopLoading() {
    signupButton.disabled = false;
    signupButton.innerHTML = signupButton.dataset.originalText;
    validateForm();
}

//GOOGLE SIGNUP
if (googleButton) {
    googleButton.addEventListener("click", () => {
        console.log("Google Sign Up Clicked");
        // Future Spring Security OAuth2
        // window.location.href = "/oauth2/authorization/google";
    });
}

//FORM SUBMIT
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm();
        if (signupButton.disabled) {
            alert("Please fill all required fields correctly.");
            return;
        }

        startLoading();

        // ============================================
        // Temporary Demo
        // Remove this when connecting Spring Boot
        // ============================================

        setTimeout(() => {
            stopLoading();
            alert("Account Created Successfully!");
            signupForm.reset();
            passwordMatch.style.display = "none";
            strengthBars.forEach(bar => {
                bar.classList.remove("active");
            });

            strengthText.textContent = "Weak";

            document.querySelectorAll(".valid-icon")
                .forEach(icon => {
                    icon.style.opacity = "0";
                });

            document.querySelectorAll(".input-box")
                .forEach(box => {
                    box.classList.remove("active");
                    box.style.borderColor =
                        "rgba(255,255,255,.08)";
                });
            validateForm();
        }, 1800);
    });
}

// ENTER KEY

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            signupForm.requestSubmit();
        }
    });
});

// INITIALIZE
window.addEventListener("DOMContentLoaded", () => {
    if (signupButton) {
        signupButton.disabled = true;
        signupButton.style.opacity = ".6";
        signupButton.style.cursor = "not-allowed";
    }

    if (passwordMatch) {
        passwordMatch.style.display = "none";
    }

    if (strengthText) {
        strengthText.textContent = "Weak";
    }

    validateForm();

});

// PREVENT COPY / PASTE IN CONFIRM PASSWORD

if (confirmPasswordInput) {
    ["copy", "paste", "cut"].forEach(event => {
        confirmPasswordInput.addEventListener(event, (e) => {
            e.preventDefault();
        });
    });
}

// REMOVE LEADING / TRAILING SPACES

[
    fullNameInput,
    usernameInput,
    emailInput
].forEach(input => {
    if (!input) return;
    input.addEventListener("blur", () => {
        input.value = input.value.trim();
    });
});

//          CAPS LOCK WARNING

function checkCapsLock(event) {
    if (!event.getModifierState("CapsLock")) return;
    console.log("Caps Lock is ON");
    // You can replace this with a UI message later.
}

passwordInput?.addEventListener("keyup", checkCapsLock);
confirmPasswordInput?.addEventListener("keyup", checkCapsLock);

// DISABLE MULTIPLE SUBMITS

let submitting = false;
signupForm?.addEventListener("submit", (e) => {
    if (submitting) {
        e.preventDefault();
        return;
    }
    submitting = true;
});
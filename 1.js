/*==================================================
                DOM ELEMENTS
==================================================*/

const signupForm = document.getElementById("signupForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.querySelector(".toggle-password");
const toggleConfirm = document.querySelector(".toggle-confirm");

const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-text");

const email = document.getElementById("email");
const username = document.getElementById("username");

const emailValidation = document.querySelector(".email-validation");
const usernameValidation = document.querySelector(".username-validation");

const confirmMessage = document.querySelector(".confirm-message");

/*==================================================
            SHOW / HIDE PASSWORD
==================================================*/

function toggleInputPassword(input, icon) {

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}

togglePassword.addEventListener("click", () => {

    toggleInputPassword(password, togglePassword);

});

toggleConfirm.addEventListener("click", () => {

    toggleInputPassword(confirmPassword, toggleConfirm);

});

/*==================================================
            PASSWORD STRENGTH
==================================================*/

password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8)
        strength++;

    if (/[A-Z]/.test(value))
        strength++;

    if (/[a-z]/.test(value))
        strength++;

    if (/[0-9]/.test(value))
        strength++;

    if (/[^A-Za-z0-9]/.test(value))
        strength++;

    switch (strength) {

        case 0:
        case 1:

            strengthBar.style.width = "20%";
            strengthBar.style.background = "#ef4444";
            strengthText.textContent = "Weak Password";

            break;

        case 2:

            strengthBar.style.width = "40%";
            strengthBar.style.background = "#f97316";
            strengthText.textContent = "Fair Password";

            break;

        case 3:

            strengthBar.style.width = "60%";
            strengthBar.style.background = "#eab308";
            strengthText.textContent = "Good Password";

            break;

        case 4:

            strengthBar.style.width = "80%";
            strengthBar.style.background = "#22c55e";
            strengthText.textContent = "Strong Password";

            break;

        case 5:

            strengthBar.style.width = "100%";
            strengthBar.style.background = "#18C27D";
            strengthText.textContent = "Very Strong Password";

            break;

    }

});

/*==================================================
                EMAIL VALIDATION
==================================================*/

email.addEventListener("input", () => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailValidation.innerHTML = "";

        return;

    }

    if (regex.test(email.value)) {

        emailValidation.innerHTML =
            '<i class="fa-solid fa-circle-check" style="color:#18C27D;"></i>';

    } else {

        emailValidation.innerHTML =
            '<i class="fa-solid fa-circle-xmark" style="color:#ef4444;"></i>';

    }

});

/*-------------- Continue in Part 2 --------------*/
/*==================================================
            USERNAME VALIDATION
==================================================*/

username.addEventListener("input", () => {

    const value = username.value.trim();

    const regex = /^[a-zA-Z0-9_]{4,20}$/;

    if (value === "") {

        usernameValidation.innerHTML = "";
        return;

    }

    if (regex.test(value)) {

        usernameValidation.innerHTML =
            '<i class="fa-solid fa-circle-check" style="color:#18C27D;"></i>';

    } else {

        usernameValidation.innerHTML =
            '<i class="fa-solid fa-circle-xmark" style="color:#ef4444;"></i>';

    }

});

/*==================================================
        CONFIRM PASSWORD VALIDATION
==================================================*/

function checkPasswordMatch() {

    if (confirmPassword.value === "") {

        confirmMessage.textContent = "";
        return;

    }

    if (password.value === confirmPassword.value) {

        confirmMessage.textContent = "✓ Passwords match";
        confirmMessage.style.color = "#18C27D";

    } else {

        confirmMessage.textContent = "✗ Passwords do not match";
        confirmMessage.style.color = "#ef4444";

    }

}

password.addEventListener("input", checkPasswordMatch);
confirmPassword.addEventListener("input", checkPasswordMatch);

/*==================================================
            IMAGE UPLOAD
==================================================*/

const profileImage = document.getElementById("profileImage");
const fileName = document.querySelector(".file-name");

profileImage.addEventListener("change", () => {

    if (profileImage.files.length > 0) {

        fileName.textContent = profileImage.files[0].name;

    } else {

        fileName.textContent = "No file selected";

    }

});

/*==================================================
            SCROLL PROGRESS BAR
==================================================*/

const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*==================================================
            BACK TO TOP BUTTON
==================================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/*==================================================
        INPUT FOCUS ANIMATION
==================================================*/

const inputs = document.querySelectorAll(".input-box input");

inputs.forEach((input) => {

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("active");

    });

    input.addEventListener("blur", () => {

        input.parentElement.classList.remove("active");

    });

});

/*-------------- Continue in Part 3 --------------*/
/*==================================================
            FORM SUBMISSION
==================================================*/

const successModal = document.querySelector(".success-modal");
const continueBtn = document.querySelector(".continue-btn");

signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    /* Required Fields */

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    if (
        firstName === "" ||
        lastName === "" ||
        username.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        alert("Please fill in all required fields.");

        return;

    }

    /* Email */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {

        alert("Please enter a valid email address.");

        email.focus();

        return;

    }

    /* Username */

    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;

    if (!usernameRegex.test(username.value)) {

        alert("Username must be 4-20 characters and contain only letters, numbers, or underscores.");

        username.focus();

        return;

    }

    /* Password Match */

    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        confirmPassword.focus();

        return;

    }

    /* Terms */

    if (!document.getElementById("terms").checked) {

        alert("Please accept the Terms & Conditions.");

        return;

    }

    /* Loading Animation */

    const submitBtn = document.querySelector(".signup-btn");

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Creating Account...
    `;

    setTimeout(() => {

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <span>Create Account</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;

        successModal.classList.add("active");

    }, 2000);

});

/*==================================================
            SUCCESS MODAL
==================================================*/

continueBtn.addEventListener("click", () => {

    successModal.classList.remove("active");

    signupForm.reset();

    strengthBar.style.width = "0";

    strengthText.textContent = "Password Strength";

    fileName.textContent = "No file selected";

    emailValidation.innerHTML = "";

    usernameValidation.innerHTML = "";

    confirmMessage.textContent = "";

});

/*==================================================
        CLOSE MODAL ON BACKDROP CLICK
==================================================*/

successModal.addEventListener("click", (e) => {

    if (e.target === successModal) {

        successModal.classList.remove("active");

    }

});

/*==================================================
        ENTER KEY SUPPORT
==================================================*/

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        successModal.classList.contains("active")
    ) {

        successModal.classList.remove("active");

    }

});

/*==================================================
        PAGE LOAD ANIMATION
==================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*==================================================
        SCROLL REVEAL ANIMATION
==================================================*/

const revealElements = document.querySelectorAll(
    ".feature-card, .signup-image, .signup-form-wrapper"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.7s ease";

    observer.observe(element);

});

/*==================================================
        INPUT PLACEHOLDER ANIMATION
==================================================*/

document.querySelectorAll("input").forEach((input) => {

    input.addEventListener("focus", () => {

        input.setAttribute(
            "data-placeholder",
            input.placeholder
        );

        input.placeholder = "";

    });

    input.addEventListener("blur", () => {

        input.placeholder =
            input.getAttribute("data-placeholder");

    });

});

/*==================================================
        END OF FILE
==================================================*/
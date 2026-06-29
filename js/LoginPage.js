// // ======================================================
// // BACK TO TOP + SCROLL PROGRESS
// // ======================================================

// const progressBar = document.getElementById("scroll-progress");
// const backTop = document.getElementById("backTop");
// const ringProgress = document.getElementById("ringProgress");

// const radius = 18;
// const circumference = 2 * Math.PI * radius;

// if (ringProgress) {
//     ringProgress.style.strokeDasharray = circumference;
//     ringProgress.style.strokeDashoffset = circumference;
// }

// function updateBackTop() {
//     const scrollTop = window.scrollY;
//     const docHeight =
//         document.documentElement.scrollHeight -
//         window.innerHeight;
//     const progress = docHeight
//         ? scrollTop / docHeight
//         : 0;
//     // Update Top Progress Bar
//     if (progressBar) {
//         progressBar.style.width = `${progress * 100}%`;
//     }
//     // Update Circular Progress
//     if (ringProgress) {
//         ringProgress.style.strokeDashoffset =
//             circumference * (1 - progress);
//     }
//     // Show / Hide Back To Top Button
//     if (backTop) {
//         backTop.classList.toggle(
//             "visible",
//             scrollTop > 350
//         );
//     }
// }

// // Scroll Event
// window.addEventListener(
//     "scroll",
//     updateBackTop,
//     { passive: true }
// );

// // Initial Call
// updateBackTop();

// // Back To Top Click
// if (backTop) {
//     backTop.addEventListener("click", () => {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     });
// }

// // ======================================================
// // SCROLL REVEAL
// // ======================================================

// const revealObserver = new IntersectionObserver(
//     (entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add(
//                     "revealed"
//                 );
//                 // Animate only once
//                 revealObserver.unobserve(
//                     entry.target
//                 );
//             }
//         });
//     },
//     {
//         threshold: 0.12,
//         rootMargin:
//             "0px 0px -40px 0px",
//     }
// );

// document.querySelectorAll(".reveal-item").forEach((el) => {
//     revealObserver.observe(el);
// });
const appealStatus = document.querySelectorAll(".appeals-status");

appealStatus.forEach((el) => {
    if (el.textContent.trim() === "отменено") {
        el.classList.add("status-red");
    } else if (el.textContent.trim() === "в работе") {
        el.classList.add("status-gray");
    } else if (el.textContent.trim() === "завершено") {
        el.classList.add("status-black");
    }
});

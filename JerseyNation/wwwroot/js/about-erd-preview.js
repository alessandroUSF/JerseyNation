document.addEventListener("DOMContentLoaded", function () {
    const erdPreview = document.querySelector("[data-erd-preview]");
    if (!erdPreview) return;

    const targetUrl = erdPreview.dataset.erdUrl || "/ERD";
    const blocks = erdPreview.querySelectorAll(".about-erd-block");

    function openErdPage() {
        window.location.href = targetUrl;
    }

    erdPreview.addEventListener("click", function (event) {
        const ignoreClick = event.target.closest("a, button");
        if (ignoreClick) return;
        openErdPage();
    });

    erdPreview.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openErdPage();
        }
    });

    blocks.forEach(block => {
        block.addEventListener("mouseenter", function () {
            blocks.forEach(item => item.classList.remove("is-active"));
            block.classList.add("is-active");
        });

        block.addEventListener("mouseleave", function () {
            block.classList.remove("is-active");
        });

        block.addEventListener("click", function (event) {
            event.stopPropagation();
            openErdPage();
        });
    });
});
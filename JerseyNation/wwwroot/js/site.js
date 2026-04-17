// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Image details

document.addEventListener("DOMContentLoaded", function () {
    const frames = document.querySelectorAll(".product-image-frame");

    frames.forEach(frame => {
        const img = frame.querySelector(".product-image");
        const prevBtn = frame.querySelector(".prev-image");
        const nextBtn = frame.querySelector(".next-image");

        const primary = frame.dataset.primary;
        const secondary = frame.dataset.secondary;

        const images = [primary, secondary].filter(Boolean);
        let currentIndex = 0;

        frame.addEventListener("mousemove", function (e) {
            const rect = frame.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            frame.style.setProperty("--zoom-x", `${x}%`);
            frame.style.setProperty("--zoom-y", `${y}%`);
        });

        frame.addEventListener("mouseleave", function () {
            frame.style.setProperty("--zoom-x", "50%");
            frame.style.setProperty("--zoom-y", "50%");
        });

        function showImage(index) {
            if (images.length === 0) return;
            currentIndex = (index + images.length) % images.length;
            img.src = images[currentIndex];
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }
    });
});


// User Profile

function getUserProfile() {
    const saved = localStorage.getItem("jerseyProfile");
    return saved ? JSON.parse(saved) : {
        searchedTeams: {},
        clickedTeams: {},
        preferredAudience: {},
        preferredTypes: {},
        preferredSizes: {},
        specialInterest: 0,
        goalkeeperInterest: 0,
        language: navigator.language || "en-US"

    };
}

function saveUserProfile(profile) {
    localStorage.setItem("jerseyProfile", JSON.stringify(profile));
}

function increaseCounter(obj, key, amount = 1) {
    obj[key] = (obj[key] || 0) + amount;
}

function normalizeValue(value) {
    return (value || "").trim().toLowerCase();
}

function registerTeamSearch(team) {
    const normalizedTeam = normalizeValue(team);
    if (!normalizedTeam) return;

    const profile = getUserProfile();
    increaseCounter(profile.searchedTeams, normalizedTeam);
    saveUserProfile(profile);
}

function registerProductClick(product) {
    const profile = getUserProfile();

    const team = normalizeValue(product.team);
    const audience = normalizeValue(product.audience);
    const type = normalizeValue(product.jerseyType);

    increaseCounter(profile.clickedTeams, team);
    increaseCounter(profile.preferredAudience, audience);
    increaseCounter(profile.preferredTypes, type);

    if (product.isSpecial) profile.specialInterest += 1;
    if (product.isGoalkeeperJersey) profile.goalkeeperInterest += 1;

    saveUserProfile(profile);
}

function registerSizePreference(size) {
    const profile = getUserProfile();
    increaseCounter(profile.preferredSizes, size);
    saveUserProfile(profile);
}


// For You Score

function getTopPreference(obj) {
    let bestKey = null;
    let bestValue = -1;

    for (const key in obj) {
        if (obj[key] > bestValue) {
            bestValue = obj[key];
            bestKey = key;
        }
    }

    return bestKey;
}

function getCountryScore(team, profile) {
    const normalizedTeam = normalizeValue(team);
    let score = 0;

    // Search interest by country
    score += (profile.searchedTeams?.[normalizedTeam] || 0) * 50;

    // Click interest by country
    score += (profile.clickedTeams?.[normalizedTeam] || 0) * 25;

    // Language affinity
    const lang = (profile.language || "").toLowerCase();

    if (lang.startsWith("pt")) {
        if (["brazil"].includes(normalizedTeam)) score += 40;
    }

    if (lang.startsWith("es")) {
        if (["mexico", "argentina", "paraguay"].includes(normalizedTeam)) score += 35;
    }

    if (lang.startsWith("fr")) {
        if (["france"].includes(normalizedTeam)) score += 40;
    }

    if (lang.startsWith("en")) {
        if (["united states", "england"].includes(normalizedTeam)) score += 30;
    }

    return score;
}

function getItemScore(product, profile) {
    let score = 0;

    const audience = normalizeValue(product.audience);
    const jerseyType = normalizeValue(product.jerseyType);
    const sizes = (product.sizes || []).map(normalizeValue);

    const topAudience = getTopPreference(profile.preferredAudience);
    const topType = getTopPreference(profile.preferredTypes);
    const topSize = getTopPreference(profile.preferredSizes);

    if (topAudience && audience === normalizeValue(topAudience)) score += 20;
    if (topType && jerseyType === normalizeValue(topType)) score += 15;
    if (product.isSpecial && profile.specialInterest > 0) score += 20;
    if (product.isGoalkeeperJersey && profile.goalkeeperInterest > 0) score += 15;
    if (topSize && sizes.includes(normalizeValue(topSize))) score += 10;
    if (product.isPromotion) score += 8;

    return score;
}

// User Dominant Team

function getDominantTeam(profile) {
    const scores = {};

    for (const [team, value] of Object.entries(profile.searchedTeams || {})) {
        scores[team] = (scores[team] || 0) + value * 4;
    }

    for (const [team, value] of Object.entries(profile.clickedTeams || {})) {
        scores[team] = (scores[team] || 0) + value * 3;
    }

    let bestTeam = null;
    let bestScore = -1;

    for (const [team, value] of Object.entries(scores)) {
        if (value > bestScore) {
            bestScore = value;
            bestTeam = team;
        }
    }

    return bestTeam;
}

//Product Score

function scoreProduct(product, profile) {
    let score = 0;

    const team = normalizeValue(product.team);
    const audience = normalizeValue(product.audience);
    const jerseyType = normalizeValue(product.jerseyType);
    const sizes = (product.sizes || []).map(normalizeValue);

    const searchedCount = profile.searchedTeams?.[team] || 0;
    const clickedCount = profile.clickedTeams?.[team] || 0;

    const topAudience = getTopPreference(profile.preferredAudience);
    const topType = getTopPreference(profile.preferredTypes);
    const topSize = getTopPreference(profile.preferredSizes);

    // Country-level preference
    score += searchedCount * 60;
    score += clickedCount * 45;

    // Audience preference
    if (topAudience && audience === normalizeValue(topAudience)) score += 25;

    // Stronger boost when team + audience match together
    if (clickedCount > 0 && topAudience && audience === normalizeValue(topAudience)) {
        score += 35;
    }

    // Other product-level boosts
    if (topType && jerseyType === normalizeValue(topType)) score += 15;
    if (product.isSpecial && profile.specialInterest > 0) score += 20;
    if (product.isGoalkeeperJersey && profile.goalkeeperInterest > 0) score += 15;
    if (topSize && sizes.includes(normalizeValue(topSize))) score += 10;
    if (product.isPromotion) score += 8;

    // Language affinity
    const lang = (profile.language || "").toLowerCase();

    if (lang.startsWith("pt") && ["brazil"].includes(team)) score += 40;
    if (lang.startsWith("es") && ["mexico", "argentina", "paraguay"].includes(team)) score += 35;
    if (lang.startsWith("fr") && ["france"].includes(team)) score += 40;
    if (lang.startsWith("en") && ["united states", "england"].includes(team)) score += 30;

    return score;
}



// For You Order

function reorderForYouSection() {
    const profile = getUserProfile();
    const container = document.querySelector("#for-you .row");

    if (!container) return;

    let items = Array.from(container.querySelectorAll(".for-you-item"));
    if (items.length === 0) return;

    items.sort((a, b) => {
        const productA = {
            team: a.dataset.team,
            audience: a.dataset.audience,
            jerseyType: a.dataset.jerseyType,
            isSpecial: a.dataset.special === "true",
            isGoalkeeperJersey: a.dataset.goalkeeper === "true",
            isPromotion: a.dataset.promotion === "true",
            sizes: (a.dataset.sizes || "").split(",").map(x => x.trim())
        };

        const productB = {
            team: b.dataset.team,
            audience: b.dataset.audience,
            jerseyType: b.dataset.jerseyType,
            isSpecial: b.dataset.special === "true",
            isGoalkeeperJersey: b.dataset.goalkeeper === "true",
            isPromotion: b.dataset.promotion === "true",
            sizes: (b.dataset.sizes || "").split(",").map(x => x.trim())
        };

        return scoreProduct(productB, profile) - scoreProduct(productA, profile);
    });

    // Reaplica no DOM na nova ordem
    container.innerHTML = "";
    items.forEach(item => container.appendChild(item));

    // Esconde todos
    items.forEach(item => {
        item.classList.add("d-none");
    });

    // Mostra só os 4 primeiros
    items.slice(0, 4).forEach(item => {
        item.classList.remove("d-none");
    });

}

// Cart

document.addEventListener("DOMContentLoaded", function () {
    const cartCountElements = document.querySelectorAll(".cart-count");
    if (cartCountElements.length === 0) return;

    const cartCount = parseInt(localStorage.getItem("cartCount") || "0", 10);

    cartCountElements.forEach(el => {
        if (cartCount > 0) {
            el.textContent = cartCount;
            el.style.display = "inline-flex";
        } else {
            el.textContent = "";
            el.style.display = "none";
        }
    });

    const cartButtons = document.querySelectorAll(".btn-cart");
    cartButtons.forEach(btn => {
        if (cartCount > 0) {
            btn.classList.add("has-count");
        } else {
            btn.classList.remove("has-count");
        }
    });
});


function updateCartCountUI() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const cartButtons = document.querySelectorAll(".btn-cart");
    const cartCount = parseInt(localStorage.getItem("cartCount") || "0", 10);

    cartCountElements.forEach(el => {
        if (cartCount > 0) {
            el.textContent = cartCount;
            el.style.display = "inline-flex";
        } else {
            el.textContent = "";
            el.style.display = "none";
        }
    });

    cartButtons.forEach(btn => {
        if (cartCount > 0) {
            btn.classList.add("has-count");
        } else {
            btn.classList.remove("has-count");
        }
    });
}

document.addEventListener("DOMContentLoaded", updateCartCountUI);
window.addEventListener("storage", updateCartCountUI);


// Shop Page Initialization

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("shopSearchForm");
    const searchInput = document.getElementById("shopSearchInput");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function () {
            const value = searchInput.value.trim();
            if (value) {
                registerTeamSearch(value);
            }
        });
    }

    document.querySelectorAll(".track-product-click").forEach(el => {
        el.addEventListener("click", function () {
            registerProductClick({
                team: el.dataset.team,
                audience: el.dataset.audience,
                jerseyType: el.dataset.jerseyType,
                isSpecial: el.dataset.special === "true",
                isGoalkeeperJersey: el.dataset.goalkeeper === "true"
            });
        });
    });

    reorderForYouSection();
});
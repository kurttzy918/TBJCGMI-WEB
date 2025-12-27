/* ---------------------------------------
   HOME PAGE CAROUSEL
--------------------------------------- */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

/* Auto-slide every 5 seconds */
setInterval(() => plusSlides(1), 5000);


/* ---------------------------------------
   BIBLE VERSE AUTO CHANGE
--------------------------------------- */
const verses = [
    "“I can do all things through Christ who strengthens me.” – Philippians 4:13",
    "“The Lord is my shepherd; I shall not want.” – Psalm 23:1",
    "“For God so loved the world...” – John 3:16",
    "“Be still, and know that I am God.” – Psalm 46:10",
    "“With God all things are possible.” – Matthew 19:26"
];

let verseIndex = 0;
const verseElement = document.getElementById("verseText");

function updateVerse() {
    verseElement.textContent = verses[verseIndex];
    verseIndex = (verseIndex + 1) % verses.length;
}

updateVerse();
setInterval(updateVerse, 10000);


/* ---------------------------------------
   VERTICAL SECTOR CAROUSEL
--------------------------------------- */
const verticalCarousels = document.querySelectorAll(".vertical-carousel");

verticalCarousels.forEach(carousel => {
    let index = 0;
    const slides = carousel.querySelectorAll(".v-slide");

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 3000);
});
/* ---------------------------------------
   MISSION PAGE CAROUSEL
--------------------------------------- */

let missionIndex = 1;
showMissionSlides(missionIndex);

function plusMissionSlides(n) {
    showMissionSlides(missionIndex += n);
}

function showMissionSlides(n) {
    let slides = document.getElementsByClassName("mission-slide");
    if (slides.length === 0) return; // Stops error if not on mission page

    if (n > slides.length) missionIndex = 1;
    if (n < 1) missionIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[missionIndex - 1].style.display = "block";
}

/* Auto-slide every 5s */
setInterval(() => {
    if (document.body.contains(document.querySelector(".mission-slide")))
        plusMissionSlides(1);
}, 5000);
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i> Music';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    }
    isPlaying = !isPlaying;

<script>
const titles = document.querySelectorAll(".fade-title");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

titles.forEach(title => observer.observe(title));

</script>

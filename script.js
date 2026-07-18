const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("active");

        menuToggle.classList.toggle("active");

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("click", (event) => {

        const clickedMenu = navbar.contains(event.target);
        const clickedButton = menuToggle.contains(event.target);

        if (
            navbar.classList.contains("active") &&
            !clickedMenu &&
            !clickedButton
        ) {

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}
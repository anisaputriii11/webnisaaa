(function ($) {
    "use strict";

    function scrollBanner() {
        $(document).on('scroll', function () {
            var scrollPos = $(this).scrollTop();
            $('.pal').css({
                'top': (scrollPos / 2) + 'px',
                'opacity': 1 - (scrollPos / 700)
            });
        });
    }
    scrollBanner();

    $(document).ready(function () {
        var offset = 300;
        var duration = 400;

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').addClass('active-arrow');
            } else {
                $('.scroll-to-top').removeClass('active-arrow');
            }
        });

        $('.scroll-to-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        function fadeInOnScroll() {
            let title = document.querySelector(".fade-title");
            if (!title) return;
            let titlePosition = title.getBoundingClientRect().top;
            let screenPosition = window.innerHeight / 1.5;

            if (titlePosition < screenPosition) {
                title.classList.add("fade-in");
            } else {
                title.classList.remove("fade-in");
            }
        }

        window.addEventListener("scroll", fadeInOnScroll);
        fadeInOnScroll();
    });

    const API_URL = "http://localhost:3000/articles";

    function loadArtikel() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                let tampil = "";
                data.forEach((artikel) => {
                    tampil += `
                        <div class="artikel-card">
                            <h3>${artikel.title}</h3>
                            <p>${artikel.content.substring(0, 100)}...</p>
                            <a href="artikel-detail.html?id=${artikel.id}" class="btn btn-primary">Baca Selengkapnya</a>
                            <button onclick="editArtikel(${artikel.id})" class="btn btn-warning">Edit</button>
                            <button onclick="hapusArtikel(${artikel.id})" class="btn btn-danger">Hapus</button>
                        </div>
                    `;
                });
                document.getElementById("artikelList").innerHTML = tampil;
            });
    }

    function tambahArtikel() {
        let title = document.getElementById("judul").value;
        let content = document.getElementById("konten").value;

        if (title && content) {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            }).then(() => {
                loadArtikel();
                document.getElementById("judul").value = "";
                document.getElementById("konten").value = "";
            });
        } else {
            alert("Harap isi semua bidang!");
        }
    }

    function hapusArtikel(id) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => loadArtikel());
    }

    function editArtikel(id) {
        let title = prompt("Edit Judul:");
        let content = prompt("Edit Konten:");

        if (title && content) {
            fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            }).then(() => loadArtikel());
        }
    }

    document.addEventListener("DOMContentLoaded", loadArtikel);
})(jQuery);

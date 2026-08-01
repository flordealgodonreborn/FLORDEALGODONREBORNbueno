document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("form");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  let datos = {};
  let rating = 0;

  function closeModal() {
    if (modal) {
      modal.classList.remove("is-open");
    }
    document.body.classList.remove("modal-open");
  }

  if (modal && modalImg && closeBtn) {
    document.querySelectorAll(".card-galeria img, .adopcion-card img").forEach(img => {
      img.addEventListener("click", () => {
        modal.classList.add("is-open");
        modalImg.src = img.src;
        document.body.classList.add("modal-open");
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.querySelectorAll(".opciones").forEach(grupo => {
    grupo.querySelectorAll("button").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        grupo.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        const nombre = grupo.dataset.name;
        datos[nombre] = 5 - index;
      });
    });
  });

  document.querySelectorAll("#stars span").forEach(star => {
    star.addEventListener("click", () => {
      rating = parseInt(star.dataset.value, 10);
      document.querySelectorAll("#stars span").forEach(s => s.classList.remove("active"));

      for (let i = 0; i < rating; i++) {
        document.querySelectorAll("#stars span")[i].classList.add("active");
      }
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const id = Date.now();
      const dataFinal = {
        id,
        atencion: datos.atencion || "",
        plazo: datos.plazo || "",
        resultado: datos.resultado || "",
        precio: datos.precio || "",
        rating: rating || "",
        mejora: document.getElementById("mejora").value
      };

      fetch("https://script.google.com/macros/s/AKfycbyKqZeq11QBU1-dDso21OoMH7I6ykAD6ycU0v_vS3_LPUaV2DVP8SQ29xlGr96U4RL0sA/exec", {
        method: "POST",
        body: JSON.stringify(dataFinal),
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        }
      })
        .then(res => res.text())
        .then(res => {
          if (res === "OK") {
            alert("✅ Reseña enviada correctamente.");
            window.location.href = "ver-resena.html?id=" + id;
          } else {
            alert("❌ No se ha podido enviar la reseña. Inténtalo más tarde.");
          }
        })
        .catch(err => {
          console.error(err);
          alert("❌ Error de conexión. Inténtalo más tarde.");
        });
    });
  }

});

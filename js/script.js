document.addEventListener("DOMContentLoaded", function () {

let datos = {};
let rating = 0;

// botones encuesta
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

// estrellas
document.querySelectorAll("#stars span").forEach(star => {
  star.addEventListener("click", () => {

    rating = parseInt(star.dataset.value);

    document.querySelectorAll("#stars span").forEach(s => s.classList.remove("active"));

    for (let i = 0; i < rating; i++) {
      document.querySelectorAll("#stars span")[i].classList.add("active");
    }
  });
});

// submit
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = Date.now();

  const dataFinal = {
    id,
    atencion: datos.atencion || "",
    plazo: datos.plazo || "",
    resultado: datos.resultado || "",
    precio: datos.precio || "",
    rating: datos.precio || "",
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
      alert("✅ Reseña enviada");
      window.location.href = "ver-resena.html?id=" + id;
    } else {
      alert("❌ Error: " + res);
    }

  })
  .catch(err => {
    console.error(err);
    alert("❌ Error de conexión");
  });

});

});

});

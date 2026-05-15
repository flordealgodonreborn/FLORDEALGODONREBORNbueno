let datos = {};
let rating = 0;

// Botones tipo encuesta
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

// Estrellas
document.querySelectorAll("#stars span").forEach(star => {
  star.addEventListener("click", () => {
    rating = star.dataset.value;

    document.querySelectorAll("#stars span").forEach(s => s.classList.remove("active"));

    for (let i = 0; i < rating; i++) {
      document.querySelectorAll("#stars span")[i].classList.add("active");
    }
  });
});

// ENVÍO DEL FORMULARIO
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  if (!rating) {
    alert("Por favor, selecciona una valoración con estrellas ⭐");
    return;
  }

  const dataFinal = {
    atencion: datos.atencion,
    plazo: datos.plazo,
    resultado: datos.resultado,
    precio: datos.precio,
    rating: rating,
    mejora: document.getElementById("mejora").value
  };

  console.log("Datos que se enviarían:", dataFinal);

  alert("✅ ¡Gracias por tu valoración!");

  document.getElementById("form").reset();
});

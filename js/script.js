document.addEventListener("DOMContentLoaded", function () {

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
    rating = parseInt(star.dataset.value); // ✅ FIX

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

  const id = Date.now();

  const dataFinal = {
    id: id,
    atencion: datos.atencion,
    plazo: datos.plazo,
    resultado: datos.resultado,
    precio: datos.precio,
    rating: rating,
    mejora: document.getElementById("mejora").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzmRu59vXA0gumVFxBEySuORvrVCu132UqIpUG61JjWtVbdv29SzeC2qYmEt0oUrpddlw/exec", {
  method: "POST",
  body: JSON.stringify(dataFinal),
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  }
})
.then(response => response.text())
.then(res => {

  console.log("Respuesta servidor:", res);

  if (res === "OK") {

    alert("✅ ¡Gracias por tu valoración!");

    window.location.href = "ver-resena.html?id=" + id;

  } else {

    alert("❌ " + res);

  }

})
.catch(err => {

  console.error(err);

  alert("❌ Error al enviar la reseña");

});

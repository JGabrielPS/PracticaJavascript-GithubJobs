const formulario = document.querySelector("#formulario"),
  resultado = document.querySelector("#resultado");

document.addEventListener("DOMContentLoaded", () => {
  formulario.addEventListener("submit", validarBusqueda);
});

function validarBusqueda(e) {
  e.preventDefault();

  const busqueda = document.querySelector("#busqueda").value;

  if (busqueda.length < 3) {
    mostrarMensaje("Busqueda muy corta... añade mas informacion");
    return;
  }

  consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
  const githubUrl = `https://jobs.github.com/positions.json?location=${busqueda}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    githubUrl
  )}`;

  axios
    .get(url)
    .then((response) => mostrarVacantes(JSON.parse(response.data.contents)));
}

function mostrarVacantes(vacantes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  if (vacantes.length > 0) {
    resultado.classList.add("grid");

    vacantes.forEach((vacante) => {
      const { title, company, type, url } = vacante;

      resultado.innerHTML += `
        <div class="shadow bg-white p-6 rounded">
            <h2 class="text-2xl font-light mb-4">${title}</h2>
            <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
            <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
            <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
        </div>
        `;
    });
  } else {
    const noResultado = document.createElement("p");
    noResultado.classList.add(
      "text-center",
      "mt-10",
      "text-gray-600",
      "w-full"
    );
    resultado.classList.remove("grid");
    noResultado.textContent =
      "No hay vacantes, intenta con otro termino de busqueda";

    resultado.appendChild(noResultado);
  }
}

function mostrarMensaje(mensaje) {
  const alerta = document.querySelector(".alerta");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add("p-3", "mt-3", "bg-gray-100", "text-center", "alerta");
    alerta.textContent = mensaje;

    resultado.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

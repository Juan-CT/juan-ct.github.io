document.addEventListener('DOMContentLoaded', function () {
	
		const URL = `https://starwars-databank-server.vercel.app/api/v1/`;

		async function pedirDatos(url, tratarD, tratarE) {
			try {
				mostrarMsjCargando();
				const respuesta = await fetch(url);
				const json = await respuesta.json();
				ocultarMsjCargando();
				tratarD(json);
			} catch (e) {
				tratarE(e);
			}
		}

		function mostrarMsjCargando() {
			document.getElementsByClassName('load')[0].classList.remove('oculto');
		}

		function ocultarMsjCargando() {
			document.getElementsByClassName('load')[0].classList.add('oculto');
		}

		function tratarError(error) {
			console.error(error);
		}

		function peticion(string) {
			return pedirDatos(URL + string, tratarDatos, tratarError);
		}

		(function nombreUsuario() {
			const divHeader = document.querySelector('body > :first-child');
			const label = crearNodo('label', 'Enter your username: ');
			const pEnter = crearNodo('p', 'Press ENTER when you are done');
			const h3 = crearNodo('h3');
			label.setAttribute('for', 'username');
			const input = crearNodo('input');
			input.setAttribute('type', 'text');
			input.setAttribute('id', 'username');
			input.addEventListener('focus', () => {
				divHeader.appendChild(pEnter);
			})
			input.addEventListener('keyup', (e) => {
				if (e.key === 'Enter') {
					h3.textContent = input.value + ", may the force be with you.";
					const guardarUsername = (valor) => localStorage.setItem('username', valor);
					guardarUsername(input.value);
					divHeader.removeChild(label);
					divHeader.removeChild(pEnter);
					divHeader.removeChild(input);
					divHeader.appendChild(h3);
					divHeader.querySelector('h3') ? document.querySelector('section.contBotones').classList.remove('oculto') : '';
				}
			})
			if (localStorage.getItem('username') !== null) {
				h3.textContent = localStorage.getItem('username') + ", may the force be with you.";
				divHeader.appendChild(h3);
				divHeader.querySelector('h3') ? document.querySelector('section.contBotones').classList.remove('oculto') : '';
			} else {
				divHeader.appendChild(label);
				divHeader.appendChild(input);
			}
		})();

		(function confBotones() {
			const botones = document.querySelectorAll('div.botones > button');
			botones.forEach(boton => {
				boton.addEventListener('click', detectarCategoria);
			})
		})();

		function detectarCategoria(e) {
			let categoria = e.currentTarget.innerHTML.toLowerCase();
			const divTabla = document.querySelector('section.contTabla');
			divTabla.innerHTML = "";
			return peticion(categoria + "?page=1&limit=none");
		}

		function tratarDatos(datos) {
			const divSelec = document.querySelector('section.contSelec');
			modDivSelec();
			const divTabla = document.querySelector('section.contTabla');
			const arrObjs = datos.data;
			const datosPorPagina = 10;
			const maxPaginas = Math.ceil(arrObjs.length / datosPorPagina);

			function modDivSelec() {
				divSelec.classList.toggle('oculto', false);
				const boton = document.querySelector('button.all');
				boton.addEventListener('click', () => {
					if (divTabla.hasChildNodes) {
						repintarTablaDiez(datosPagina(1), 1);
					} else {
						pintarTablaDiez(datosPagina(1), 1);
					}
				})
				const inputBuscar = document.querySelector('section.contSelec > input');
				inputBuscar.placeholder = 'Search...';
				inputBuscar.addEventListener('input', () => {
					const valorBuscar = inputBuscar.value.toLowerCase();
					const listaNombres = filtrarNombres(valorBuscar);
					const elemLista = document.getElementById('busqueda');
					elemLista.innerHTML = "";
					listaNombres.forEach(nombre => {
						const opcion = document.createElement('option');
						opcion.value = nombre;
						elemLista.appendChild(opcion);
					})
				})
				inputBuscar.addEventListener('change', () => {
					const item = arrObjs.filter(obj => obj.name === inputBuscar.value).map(obj => obj);
					selec(item);
					inputBuscar.value = "";
				})
				function filtrarNombres(valor) {
					return arrObjs.filter(obj => obj.name.toLowerCase().includes(valor)).map(obj => obj.name);
				}
				
			}

			function selec(dato) {
				if (divTabla.hasChildNodes()) {
					const tablaOld = divTabla.firstChild;
					divTabla.removeChild(tablaOld);
					divTabla.appendChild(pintarSelec(dato));
				} else {
					divTabla.appendChild(pintarSelec(dato));
				}
			}

			function pintarSelec(dato) {
				const tabla = crearNodo('table');
				const trH = crearNodo('tr');
				trH.appendChild(crearNodo('th', 'Name'));
				trH.appendChild(crearNodo('th', 'Description'));
				trH.appendChild(crearNodo('th', 'Photo'));
				const tbody = crearNodo('tbody');
				const trD = crearNodo('tr');
				trD.appendChild(crearNodo('h4', dato[0].name));
				trD.appendChild(crearNodo('td', dato[0].description));
				const img = crearNodo('img');
				img.setAttribute('src', dato[0].image);
				trD.appendChild(img);
				tbody.appendChild(trD);
				tabla.appendChild(trH);
				tabla.appendChild(tbody);
				return tabla;
			}

			function datosPagina(pagina) {
				const inicio = (pagina - 1) * datosPorPagina;
				const fin = inicio + datosPorPagina;
				return arrObjs.slice(inicio, fin);
			}

			function pintarTablaDiez(datPag, pagina) {
				const tabla = crearNodo('table');
				tabla.appendChild(crearTHead());
				
				tabla.appendChild(crearTBody());
				divTabla.appendChild(tabla);

				function crearTBody() {
					const tbody = crearNodo('tbody');
					datPag.forEach(item => {
						const tr = crearNodo('tr');
						const tdName = crearNodo('td');
						const h4Name = crearNodo('h4', item.name)
						tdName.appendChild(h4Name);
						const tdDesc = crearNodo('td', item.description);
						const tdImg = crearNodo('td');
						const img = crearNodo('img');
						img.setAttribute('src', item.image);
						tdImg.appendChild(img);
						tr.appendChild(tdName);
						tr.appendChild(tdDesc);
						tr.appendChild(tdImg);
						tbody.appendChild(tr);
					})
					return tbody;
				}

				function crearTHead() {
					const thead = crearNodo('thead');
					const tr = crearNodo('tr');
					const anterior = crearNodo('span');
					pagina > 1 ? anterior.textContent = "Previous page" : "";
					anterior.addEventListener('click', () => {
						const nuevaPag = pagina - 1;
						repintarTablaDiez(datosPagina(nuevaPag), nuevaPag);
					});
					const thA = crearNodo('th');
					thA.appendChild(anterior);
					const thP = crearNodo('th', `Page ${pagina}/${maxPaginas}`);
					const siguiente = crearNodo('span');
					pagina < maxPaginas ? siguiente.textContent = "Next page" : "";
					siguiente.addEventListener('click', () => {
						const nuevaPag = pagina + 1;
						repintarTablaDiez(datosPagina(nuevaPag), nuevaPag);
					});
					const thS = crearNodo('th');
					thS.appendChild(siguiente);
					tr.appendChild(thA);
					tr.appendChild(thP);
					tr.appendChild(thS);
					thead.appendChild(tr);
					return thead;
				}
			}

			function repintarTablaDiez(datPag, pagina) {
				if (divTabla.hasChildNodes()) {
					const tablaOld = divTabla.firstChild;
					divTabla.removeChild(tablaOld);
					pintarTablaDiez(datPag, pagina);
				} else {
					pintarTablaDiez(datPag, pagina);
				}
			}
		}

		function crearNodo(elemento, contenido) {
			const ele = document.createElement(elemento);
			if (contenido) {
				const texto = document.createTextNode(contenido);
				ele.appendChild(texto);
			}
			return ele;
		}
})

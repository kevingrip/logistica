document.addEventListener('DOMContentLoaded', function() {
    // Ruta del archivo JSON
    var archivoJSON = 'totalEnvios.json';
    
    // Variables globales
    var data = [];
    var botonesMes = document.getElementById('filtrosMeses');
    var botonesSemana = document.getElementById('filtrosSemanas');
    var selectYear = document.getElementById('year');
    var botonFiltrar = document.getElementById('filtrar');
    var mesesDisponibles = new Set();
    var semanasDisponibles = new Set();

    // Obtener datos JSON
    fetch(archivoJSON)
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            
            // Inicializar años en el filtro
            inicializarYears(data);
            
            // Obtener y mostrar botones de mes
            obtenerBotonesMeses(data);
            
            // Obtener y mostrar botones de semana
            obtenerBotonesSemanas(data);

            // Ordenar los datos por fecha ascendente
            data.sort((a, b) => convertirFecha(a.Fecha) - convertirFecha(b.Fecha));
            
            // Mostrar los envíos en las tablas
            mostrarEnvios(data, 'cuerpoTablaNP', 'NP');
            mostrarEnvios(data, 'cuerpoTablaFIGUS', 'FIGUS');

            // Añadir evento al botón de filtrar
            botonFiltrar.addEventListener('click', function() {
                filtrarPorMesSeleccionadoYYear();
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON', error));

    // Función para convertir la fecha al formato 'DD/MM/YYYY' y luego a milisegundos para la comparación
    function convertirFecha(fecha) {
        var partes = fecha.split('/');
        return new Date(partes[2], partes[1] - 1, partes[0]).getTime();
    }

    // Función para mostrar los envíos en la tabla especificada y filtrados por tipo
    function mostrarEnvios(envios, idTabla, tipoEnvio) {
        var cuerpoTabla = document.getElementById(idTabla);

        // Limpiar la tabla antes de insertar nuevos datos
        cuerpoTabla.innerHTML = '';

        // Filtrar los envíos por tipo (NP o FIGUS)
        var enviosFiltrados = envios.filter(envio => envio.Envio === tipoEnvio);

        enviosFiltrados.forEach(function(envio) {
            // Crear una nueva fila para cada objeto
            var fila = document.createElement('tr');

            // Crear las celdas para cada propiedad del objeto
            var diaCell = document.createElement('td');
            diaCell.textContent = envio.Dia;
            fila.appendChild(diaCell);

            var fechaCell = document.createElement('td');
            fechaCell.textContent = envio.Fecha;
            fila.appendChild(fechaCell);

            var tipoEnvioCell = document.createElement('td');
            tipoEnvioCell.textContent = envio.Envio;
            fila.appendChild(tipoEnvioCell);

            var zonaCell = document.createElement('td');
            zonaCell.textContent = envio.Zona;
            fila.appendChild(zonaCell);

            var localidadCell = document.createElement('td');
            localidadCell.textContent = envio.Localidad;
            fila.appendChild(localidadCell);

            var precioCell = document.createElement('td');
            precioCell.textContent = envio.Precio;
            fila.appendChild(precioCell);

            // Agregar la fila al cuerpo de la tabla
            cuerpoTabla.appendChild(fila);
        });
    }

    // Función para inicializar el filtro de años
    function inicializarYears(data) {
        var years = Array.from(new Set(data.map(envio => new Date(envio.Fecha.split('/').reverse().join('/')).getFullYear()))).sort();
        var selectYear = document.getElementById('year');
        
        years.forEach(year => {
            var opcion = document.createElement('option');
            opcion.value = year;
            opcion.textContent = year;
            selectYear.appendChild(opcion);
        });
    }

    // Función para obtener y mostrar botones de filtro por mes
    function obtenerBotonesMeses(data) {
        // Obtener meses únicos disponibles en los datos
        data.forEach(envio => {
            var fecha = new Date(envio.Fecha.split('/').reverse().join('/'));
            var mes = fecha.getMonth() + 1; // Mes en formato 1-12
            mesesDisponibles.add(mes);
        });

        // Agregar botones para cada mes
        mesesDisponibles.forEach(mes => {
            var boton = document.createElement('button');
            boton.textContent = obtenerNombreMes(mes);
            boton.dataset.mes = mes;
            boton.addEventListener('click', () => {
                document.querySelectorAll('#filtrosMeses button').forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                filtrarPorMes(mes);
            });
            botonesMes.appendChild(boton);
        });
    }

    // Función para obtener y mostrar botones de filtro por semana
    function obtenerBotonesSemanas(data) {
        // Obtener semanas únicas disponibles en los datos
        data.forEach(envio => {
            var fecha = new Date(envio.Fecha.split('/').reverse().join('/'));
            var semana = obtenerSemanaDelAno(fecha); // Semana del año
            semanasDisponibles.add(semana);
        });

        // Agregar botones para cada semana
        semanasDisponibles.forEach(semana => {
            var boton = document.createElement('button');
            boton.textContent = `Semana ${semana}`;
            boton.dataset.semana = semana;
            boton.addEventListener('click', () => {
                document.querySelectorAll('#filtrosSemanas button').forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                filtrarPorSemana(semana);
            });
            botonesSemana.appendChild(boton);
        });
    }

    // Función para obtener el nombre del mes en español
    function obtenerNombreMes(mes) {
        const nombresMeses = {
            1: 'Ene',
            2: 'Feb',
            3: 'Mar',
            4: 'Abr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Ago',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dic'
        };
        return nombresMeses[mes] || 'Desconocido';
    }

    // Función para obtener la semana del año
    function obtenerSemanaDelAno(fecha) {
        var primerDiaDelAno = new Date(fecha.getFullYear(), 0, 1);
        var diferencia = fecha - primerDiaDelAno + ((primerDiaDelAno.getDay() + 1) * 24 * 60 * 60 * 1000);
        return Math.ceil(diferencia / (7 * 24 * 60 * 60 * 1000));
    }

    // Función para filtrar los datos según el mes seleccionado
    function filtrarPorMes(mesSeleccionado) {
        var yearSeleccionado = selectYear.value;

        var datosFiltrados = data.filter(envio => {
            var fecha = new Date(envio.Fecha.split('/').reverse().join('/'));
            var mes = fecha.getMonth() + 1; // Mes en formato 1-12
            var year = fecha.getFullYear();

            return (!yearSeleccionado || year === parseInt(yearSeleccionado)) && mes === mesSeleccionado;
        });

        // Mostrar los envíos filtrados en las tablas
        mostrarEnvios(datosFiltrados, 'cuerpoTablaNP', 'NP');
        mostrarEnvios(datosFiltrados, 'cuerpoTablaFIGUS', 'FIGUS');
    }

    // Función para filtrar los datos según la semana seleccionada
    function filtrarPorSemana(semanaSeleccionada) {
        var yearSeleccionado = selectYear.value;

        var datosFiltrados = data.filter(envio => {
            var fecha = new Date(envio.Fecha.split('/').reverse().join('/'));
            var semana = obtenerSemanaDelAno(fecha);
            var year = fecha.getFullYear();

            return (!yearSeleccionado || year === parseInt(yearSeleccionado)) && semana === semanaSeleccionada;
        });

        // Mostrar los envíos filtrados en las tablas
        mostrarEnvios(datosFiltrados, 'cuerpoTablaNP', 'NP');
        mostrarEnvios(datosFiltrados, 'cuerpoTablaFIGUS', 'FIGUS');
    }

    // Función para filtrar por mes y año seleccionados
    function filtrarPorMesSeleccionadoYYear() {
        var mesSeleccionado = document.querySelector('#filtrosMeses .active')?.dataset.mes;
        var semanaSeleccionada = document.querySelector('#filtrosSemanas .active')?.dataset.semana;
        var yearSeleccionado = selectYear.value;

        var datosFiltrados = data.filter(envio => {
            var fecha = new Date(envio.Fecha.split('/').reverse().join('/'));
            var mes = fecha.getMonth() + 1; // Mes en formato 1-12
            var semana = obtenerSemanaDelAno(fecha);
            var year = fecha.getFullYear();

            return (!yearSeleccionado || year === parseInt(yearSeleccionado)) &&
                (!mesSeleccionado || mes === parseInt(mesSeleccionado)) &&
                (!semanaSeleccionada || semana === parseInt(semanaSeleccionada));
        });

        // Mostrar los envíos filtrados en las tablas
        mostrarEnvios(datosFiltrados, 'cuerpoTablaNP', 'NP');
        mostrarEnvios(datosFiltrados, 'cuerpoTablaFIGUS', 'FIGUS');
    }
});

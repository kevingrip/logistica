document.addEventListener('DOMContentLoaded', function() {
    // Ruta del archivo JSON
    var archivoJSON = 'totalEnvios.json';

    // Obtener datos JSON
    fetch(archivoJSON)
        .then(response => response.json())
        .then(data => {
            // Mostrar los datos en la tabla
            mostrarDatos(data);
        })
        .catch(error => console.error('Error al cargar el archivo JSON', error));

        
        function mostrarDatos(datos) {
            var cuerpoTabla = document.getElementById('cuerpoTablaDatos');
    
            // Limpiar la tabla antes de insertar nuevos datos
            cuerpoTabla.innerHTML = '';
    
            // Procesar cada objeto de datos
            datos.forEach(dato => {
                // Crear una nueva fila para cada objeto
                var fila = document.createElement('tr');
    
                // Crear las celdas para cada propiedad del objeto
                var diaCell = document.createElement('td');
                diaCell.textContent = dato.Dia;
                fila.appendChild(diaCell);
    
                var fechaCell = document.createElement('td');
                fechaCell.textContent = dato.Fecha;
                fila.appendChild(fechaCell);
    
                var envioCell = document.createElement('td');
                envioCell.textContent = dato.Envio;
                fila.appendChild(envioCell);
    
                var zonaCell = document.createElement('td');
                zonaCell.textContent = dato.Zona;
                fila.appendChild(zonaCell);
    
                var localidadCell = document.createElement('td');
                localidadCell.textContent = dato.Localidad;
                fila.appendChild(localidadCell);
    
                var precioCell = document.createElement('td');
                precioCell.textContent = dato.Precio;
                fila.appendChild(precioCell);
    
                // Agregar la fila al cuerpo de la tabla
                cuerpoTabla.appendChild(fila);
            });
        }
    });
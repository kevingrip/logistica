document.addEventListener('DOMContentLoaded', function(){
    var archivoJson = '../totalEnvios.json';


    function botonSemanaDisponible(data){

        const datos2025 = data.filter(dato=> dato.Year==="2025");

        const semanasDisponibles=new Set();
        datos2025.forEach(sem=>{
            const semana = sem.Semana
            semanasDisponibles.add(semana);
            // if (sem.Mes === mesSeleccionado) {
            //     semanasDisponibles.add(semana);
            // }
        });
    
    
        const semanasArray = Array.from(semanasDisponibles);    
        const semanaNumerica = semanasArray.map(semana => parseInt(semana, 10));
        semanaMax = Math.max(...semanaNumerica);
        semanaSeleccionada = semanaMax

        function actualizarSemana(){
            nroSemana.textContent = semanaSeleccionada
            mostrarDatos(datos2025,'MOTO','renderMoto',semanaSeleccionada);
            if (semanaMax > semanaSeleccionada ) {
                btnSig.style.visibility = 'visible';
            } else {
                btnSig.style.visibility = 'hidden';
            }
        }

    
        
        const IdSemana = document.getElementById('nroSemana')
        IdSemana.innerHTML = '';
        const nroSemana = document.createElement('p')
        
        const btnAnt = document.createElement('button')
        btnAnt.textContent = '<'
        btnAnt.addEventListener('click',()=>{
            semanaSeleccionada-=1
            actualizarSemana()
        })
        IdSemana.appendChild(btnAnt)
        IdSemana.appendChild(nroSemana)
        
        
        

        const btnSig = document.createElement('button');
        btnSig.textContent = '>';
        btnSig.addEventListener('click', () => {
            semanaSeleccionada += 1;
            actualizarSemana();            
        });
        IdSemana.appendChild(btnSig)

        if (semanaMax > semanaSeleccionada ) {
            btnSig.style.visibility = 'visible';
        } else {
            btnSig.style.visibility = 'hidden';
        }
        
        nroSemana.textContent = semanaSeleccionada    

        console.log("Semanas disponibles:", semanasDisponibles);

        mostrarDatos(datos2025,'MOTO','renderMoto',semanaSeleccionada);    

    }
    
    function mostrarDatos(datos,env,render,semanaSeleccionada) {

        const datosTabla = document.getElementById(render);

        datosTabla.innerHTML='';

        let datosFiltrados = datos.filter(empresa => empresa.Cliente === env)

        datosFiltrados = datosFiltrados.filter(dato => dato.Semana === semanaSeleccionada);

        const totalSuma = datosFiltrados.reduce((total, dato) => {
            return total + dato.PrecioCobrar;
        }, 0);

        const totalPrecio = document.createElement('td')
        totalPrecio.textContent=`$ ${totalSuma}`
        totalPrecio.classList.add('totalprecio')

        const totalSemana = document.createElement('td')
        totalSemana.textContent= 'Total Semana' 
        totalSemana.classList.add('totalprecio')

        const vacio = document.createElement('td')
        vacio.textContent= '' 
        vacio.classList.add('totalprecio')

        const vacio2 = document.createElement('td')
        vacio2.textContent= '' 
        vacio2.classList.add('totalprecio')

        const vacio3 = document.createElement('td')
        vacio3.textContent= ''
        vacio3.classList.add('totalprecio') 

        const vacio4 = document.createElement('td')
        vacio4.textContent= '' 
        vacio4.classList.add('totalprecio')              
        

        datosFiltrados.forEach(dato => {
            

            const fila = document.createElement('tr');

            const day = document.createElement('td')
            day.textContent= dato.Dia
            fila.appendChild(day);

            const date = document.createElement('td')
            date.textContent= dato.Fecha
            fila.appendChild(date);

            const cliente = document.createElement('td')
            cliente.textContent= dato.Cliente
            fila.appendChild(cliente);

            const partido = document.createElement('td')
            partido.textContent= dato.Localidad
            fila.appendChild(partido)

            const precioEnvio = document.createElement('td')
            precioEnvio.textContent= `$ ${dato.PrecioCobrar}`
            fila.appendChild(precioEnvio)         
            
            if (dato.Cobrado === 'SI'){                
                precioEnvio.style.backgroundColor = '#a4fdc9';
            }
            else{
                precioEnvio.style.backgroundColor = '#ff9c9c';
            }

            if (dato.Pagado==='SI'){
                totalPrecio.style.backgroundColor = '#39ff14';
                totalPrecio.style.color = '#000000';
                totalSemana.style.color = '#000000';
                totalSemana.style.backgroundColor = '#39ff14';
                vacio.style.backgroundColor = '#39ff14';
                vacio2.style.backgroundColor = '#39ff14';
                vacio4.style.backgroundColor = '#39ff14';
            }
        

            datosTabla.appendChild(fila);
            datosTabla.appendChild(totalSemana)
            datosTabla.appendChild(vacio)
            datosTabla.appendChild(vacio2)
            datosTabla.appendChild(vacio4)
            datosTabla.appendChild(totalPrecio)
            
        });
    }

    fetch(archivoJson)
    .then(response=>response.json())
    .then(data => {

        botonSemanaDisponible(data);
        mostrarDatos(data,'MOTO','renderMoto',semanaSeleccionada);
                    
    })
    .catch(error => console.error('Error al cargar el archivo JSON', error))

})
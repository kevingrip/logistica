import easygui
import json
from funcionFecha import*
import locale

locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

with open ("zone.json","r") as zjs:
    zone = json.load(zjs)

def nuevoViaje ():

    dia_seleccionado = easygui.buttonbox("Seleccione un día de la semana:", choices=['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'])

    seguir = True
    while seguir == True:

        zones = []
        locality = []


        # Obtener y mostrar la fecha exacta del día seleccionado
        if dia_seleccionado:
            fechaDia = obtener_fecha(dia_seleccionado)
            print(fechaDia)

        semana=semana_del_ano(fechaDia[0])
        mes=fechaDia[2]
        year=fechaDia[3]

        print(mes,year)

        canalVenta = easygui.buttonbox(fechaDia[1]+' '+fechaDia[0]+": Ingresa empresa",choices=["NP","NUESTRO","PLEX"])

        if canalVenta=="NUESTRO":
            cliente=easygui.buttonbox(choices=["FIGUS","MOTOS"])

        if 'rcoles' in fechaDia[1]:
            print("pasa")
            fechaDia[1]='miercoles'

        print(fechaDia[1])

        for zona in zone:
            zones.append(zona)
        zones.append("CABA")
            
        zonaDefinida = easygui.buttonbox(fechaDia[1]+' '+fechaDia[0]+' '+canalVenta+'--'+"Elija una zona",choices=zones)

        if zonaDefinida!='CABA':
            for item in zone[zonaDefinida]:
                locality.append(item["LOCALIDAD"])
            localidadDefinida = easygui.buttonbox("Elija una Localidad",choices=locality)
        else:
            localidadDefinida='CABA'
            precio = 5105

        if localidadDefinida!='CABA':
            for item in zone[zonaDefinida]:
                if item["LOCALIDAD"] == localidadDefinida:
                    precio = item["PRECIO"]

        if canalVenta=="PLEX":
            cliente = easygui.buttonbox(choices=["FIGUS","DVR","ROPA","CHAPA"])
            if cliente == "FIGUS":
                if localidadDefinida in ("CABA","San Miguel"): 
                    precio=6000
            else: 
                if localidadDefinida in ("CABA","San Miguel"): 
                    precio=4565
                elif localidadDefinida in ("Tres De Febrero"):
                    precio=3785
        
        if canalVenta=="NP":
            cliente = easygui.buttonbox(choices=["DVR","ROPA","MOTOS","CHAPA"])

        if localidadDefinida:
            agregarEnvio = {"Dia":fechaDia[1].capitalize(),"Mes":mes,"Year":year,"Semana":semana,"Fecha":fechaDia[0],"Envio":canalVenta,"Cliente":cliente,"Zona":zonaDefinida,"Localidad":localidadDefinida,"Precio":precio,"Pagado":"NO"}
            with open ("totalEnvios.json","r", encoding="utf-8") as tenv:
                totalEnv = json.load(tenv)

            totalEnv.append(agregarEnvio)

            with open("totalEnvios.json", "w", encoding="utf-8") as tenv:
                json.dump(totalEnv, tenv, indent=4)

            print("Envio agregado correctamente")
            respuestaSeguir = easygui.buttonbox("Seguir agregando al mismo dia?",choices=(["SI","NO"]))
            if respuestaSeguir == 'SI':
                seguir=True
            else:
                seguir=False
        else:
            print("Error de ingreso de localidad")
            seguir=False
    

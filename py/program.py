import easygui
from aggregate import *
from complete import *


inicio = easygui.buttonbox("Ingrese una opcion", choices=["Agregar nuevo viaje","Marcar semana"])

if inicio == "Agregar nuevo viaje":
    nuevoViaje()
elif inicio == "Marcar semana":
    complete()
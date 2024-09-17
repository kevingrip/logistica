import easygui
import datetime

# Función para obtener la fecha exacta de un día de la semana
def obtener_fecha(dia_semana):
    # Obtener el número del día de la semana actual
    dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    dia_actual = datetime.datetime.now().weekday()

    # Calcular la diferencia de días
    index_dia_semana = dias_semana.index(dia_semana)
    diferencia_dias = index_dia_semana - dia_actual

    # Si la diferencia es negativa, ajustar para días anteriores
    # if diferencia_dias < 0:
    #     diferencia_dias -= 7

    # Obtener la fecha exacta del día de la semana seleccionado
    fecha_exacta = datetime.datetime.now() + datetime.timedelta(days=diferencia_dias)
    return fecha_exacta.strftime("%A, %d de %B de %Y")

# Mostrar botones para seleccionar el día de la semana
dia_seleccionado = easygui.buttonbox("Seleccione un día de la semana:", choices=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])

# Obtener y mostrar la fecha exacta del día seleccionado
if dia_seleccionado:
    fecha = obtener_fecha(dia_seleccionado)
    easygui.msgbox(f"La fecha exacta de {dia_seleccionado} es:\n{fecha}", title="Fecha Exacta")

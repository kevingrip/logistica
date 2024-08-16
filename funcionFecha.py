import datetime
import locale

locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

# Función para obtener la fecha exacta de un día de la semana
def obtener_fecha(dia_semana):
    # Obtener el número del día de la semana actual
    dias_semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    dia_actual = datetime.datetime.now().weekday()

    # Calcular la diferencia de días
    index_dia_semana = dias_semana.index(dia_semana)
    diferencia_dias = index_dia_semana - dia_actual

    # Si la diferencia es negativa, ajustar para días anteriores
    # if diferencia_dias < 0:
    #     diferencia_dias -= 7

    # Obtener la fecha exacta del día de la semana seleccionado
    fecha_exacta = datetime.datetime.now() + datetime.timedelta(days=diferencia_dias)
    return ([fecha_exacta.strftime("%d/%m/%Y"),fecha_exacta.strftime("%A"),fecha_exacta.strftime("%m"),fecha_exacta.strftime("%Y")])

# Mostrar botones para seleccionar el día de la semana

def semana_del_ano(fecha_str):


    fecha = datetime.datetime.strptime(fecha_str, "%d/%m/%Y")

    _, semana, _ = fecha.isocalendar()
    return semana


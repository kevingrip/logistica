from datetime import datetime, timedelta

def semanas_del_mes(mes, año):
    # Lista para almacenar los números de las semanas del año
    semanas = set()
    
    # Encontrar el primer día del mes
    primer_dia_del_mes = datetime(año, mes, 1)
    
    # Encontrar el último día del mes
    ultimo_dia_del_mes = datetime(año, mes + 1, 1) - timedelta(days=1)
    
    # Recorrer todos los días del mes
    dia_actual = primer_dia_del_mes
    while dia_actual <= ultimo_dia_del_mes:
        # Obtener el número de la semana del año
        semana_del_año = dia_actual.isocalendar()[1]
        semanas.add(semana_del_año)
        
        # Pasar al siguiente día
        dia_actual += timedelta(days=1)
    
    # Convertir el conjunto a una lista y ordenarla
    semanas = sorted(semanas)
    
    return semanas

# Ejemplo de uso
mes = 8  # Julio
año = 2024
semanas = semanas_del_mes(mes, año)
print(semanas)
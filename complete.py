import easygui
import json

def complete():

    with open ("totalEnvios.json","r", encoding="utf-8") as tenv:
        totalEnv = json.load(tenv)

    distinctSemana = []

    empresa = easygui.buttonbox("Ingrese Empresa", choices=["NP","NUESTRO","PLEX"])


    for x in totalEnv:
        if str(x["Semana"]) not in distinctSemana:
            distinctSemana.append(str(x["Semana"]))

    semana = easygui.buttonbox("Ingrese Semana", choices=distinctSemana)

    for x in totalEnv:
        if x["Envio"] == empresa and x['Semana'] == int(semana) and x["Pagado"] == "NO":
            x["Pagado"] = "SI"
            print(x)

    with open("totalEnvios.json", "w", encoding="utf-8") as tenv:
        json.dump(totalEnv, tenv, indent=4)
    
    print("Semana Pagada: ", semana)
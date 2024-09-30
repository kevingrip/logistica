import easygui
import json

def complete():

    with open ("totalEnvios.json","r", encoding="utf-8") as tenv:
        totalEnv = json.load(tenv)

    distinctSemana = []

    tipoAccion = easygui.buttonbox("Marcar", choices=["COBRADA","PAGADA"])

    if (tipoAccion=="COBRADA"):
        empresa = easygui.buttonbox("Ingrese Empresa", choices=["DVR","CHAPA","ROPA","MOTO"])
    else:
        empresa = easygui.buttonbox("Ingrese Empresa", choices=["NP","NUESTRO","PLEX"])


    for x in totalEnv:
        if str(x["Semana"]) not in distinctSemana:
            distinctSemana.append(str(x["Semana"]))

    semana = easygui.buttonbox("Ingrese Semana", choices=distinctSemana)

    for x in totalEnv:
        if(tipoAccion=="PAGADA"):
            if ((x["Cliente"] == "FIGUS") and (x["Envio"] == "PLEX")) and x['Semana'] == int(semana) and x["Pagado"] == "NO":
                x["Pagado"] = "SI"
                x["Cobrado"] = "SI"
                print(x)
            # if ((x["Cliente"] == "FIGUS") and (x["Envio"] == "NUESTRO")) and x['Semana'] == int(semana) and x["Pagado"] == "NO":
            #     x["Pagado"] = "SI"
            #     x["Cobrado"] = "SI"
            #     print(x)
            if ((x["Envio"] == empresa) or (x["Cliente"] == empresa)) and x['Semana'] == int(semana) and x["Pagado"] == "NO":
                x["Pagado"] = "SI"
                print(x)
        else:
            if ((x["Envio"] == empresa) or (x["Cliente"] == empresa)) and x['Semana'] == int(semana) and x["Cobrado"] == "NO":
                x["Cobrado"] = "SI"
                print(x)

    with open("totalEnvios.json", "w", encoding="utf-8") as tenv:
        json.dump(totalEnv, tenv, indent=4)
    
    print("Semana Pagada: ", semana)
import json

with open("zone.json","r") as zjs:
    zone = json.load(zjs)

for zones in zone:
    for item in zone[zones]:
        if (item["LOCALIDAD"] in ("San Fernando","Ituzaingo","La Matanza Norte","Malvinas Argentinas","San Isidro","San Miguel","Vicente Lopez")):
            item["PRECIO"]=6024
            item["CORDON"]=2
        if (item["LOCALIDAD"] in ("Almirante Brown","Florencio Varela","Berazategui")):
            item["PRECIO"]=8300        
            item["CORDON"]=3
        if (item["LOCALIDAD"] in ("Hurlingham","Moron","San Martin","Tres De Febrero")):
            item["CORDON"]=1
            item["PRECIO"]=3785
        else:
            if item["PRECIO"]==8500:
                item["CORDON"]=4


with open("zone.json","w") as zjs:
    json.dump(zone,zjs,indent=4)
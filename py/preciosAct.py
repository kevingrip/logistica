import json

with open("zone.json","r") as zjs:
    zone = json.load(zjs)

for zones in zone:
    for item in zone[zones]:
        if (item["CORDON"]==1):
            item["PRECIO"]=3785
        elif (item["CORDON"]==2):
            item["PRECIO"]=6024
        elif (item["CORDON"]==3):
            item["PRECIO"]=8300
        else:
            item["PRECIO"]=8500


with open("zone.json","w") as zjs:
    json.dump(zone,zjs,indent=4)
import json

file="../data/users.json"

with open(file) as f:
 users=json.load(f)

name=input("Nom : ")
role=input("Role : ")
lat=float(input("Latitude : "))
lng=float(input("Longitude : "))

new={
"id":len(users)+1,
"name":name,
"role":role,
"lat":lat,
"lng":lng
}

users.append(new)

with open(file,"w") as f:
 json.dump(users,f,indent=4)

print("Utilisateur ajouté")
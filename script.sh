echo '\n\n requesting all heroes'
curl localhost:3000/heroes

echo '\n\n requesting flash'
curl localhost:3000/heroes/1

echo '\n\n requesting with wrong body'
curl --silent -X POST \
     --data-binary '{"invalid": "data"}' \
     localhost:3000/heroes

echo '\n\n create Goku'
CREATE=$(curl --silent -X POST \
     --data-binary '{"name": "Goku", "age": 30, "power": "Saiyajin Blue"}' \
     localhost:3000/heroes)

echo $CREATE
ID=$(echo $CREATE | jq .id)

echo '\n\n requesting Goku'
curl localhost:3000/heroes/$ID
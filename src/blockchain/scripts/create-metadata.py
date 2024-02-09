
import json

baseURL = "ipfs://bafybeiahp4jdgfhburrtkegfvjg6wutobm2whqd62wd5qnp5pabnijdxxy"
totalSupply = 62

for i in range(1, totalSupply + 1):
    dictionary = {
        "name": f"Sqrl #{i}",
        "description": f"This unique NFT is #{i}/{totalSupply} from the Sqrls Collection",
        "image": f'{baseURL}/{i}.png'
    }

    # Serializing json
    json_object = json.dumps(dictionary, indent=4)

    # Writing to sample.json
    with open(f'meta/{i}', "w") as outfile:
        outfile.write(json_object)

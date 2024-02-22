import requests
import pandas as pd

# Read CSV file into a pandas DataFrame
csv_file_path = 'data/hapiscore_whr.csv'
df = pd.read_csv(csv_file_path, skiprows=0, header=None)

# Extract header and data rows
header = df.iloc[0, :].tolist()
data_rows = df.iloc[1:, :]

# Convert to dictionary
result = {}

for _, row in data_rows.iterrows():
    country = row[0]
    for i in range(1, len(row)):
        year = int(header[i])
        score = str(row[i]) if pd.notna(row[i]) else "NaN"
        if year not in result:
            result[year] = []
        result[year].append({"country": country, "year": year, "score": score})


delete = {}
for year, entries in result.items():
    print(f"Year {year}:")
    dataset_id = "fluree-jld/387028092977980"
    api_key = "hDmX3gXF8N8dSGYQ80Wn2o9-_3oSSJUdU2n-uaQjGnxlmH_gEXeLKGunKu4fJ5Dwb_7kYAP7-34b1DHC_Lo-Gg"

    transaction = {
        "ledger": dataset_id,
        "delete": delete,
        "@context": {},
        "insert": result[year],
    }

    delete = result[year]

    url = "https://data.flur.ee/fluree/transact"  # change to local host
    headers = {
        "Content-Type": "application/json",
        "Authorization": api_key,
        'Accept': 'text/plain'
    }

    response = requests.post(url, headers=headers,
                             json=transaction)
    data = response.json()
    print(data)

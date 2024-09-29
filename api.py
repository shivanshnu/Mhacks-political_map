from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS  # Import CORS
from flask_cors import cross_origin
import pymongo
import certifi


app = Flask(__name__)

# Allow all origins (for development purposes). You can restrict later.
CORS(app)

# MongoDB connection (replace with your credentials)
connection_string = "mongodb+srv://adnanr:gD7xTHl8ez4mxxuo@election.sj7eh.mongodb.net/"
client = pymongo.MongoClient(connection_string, tlsCAFile=certifi.where())
# client = MongoClient("mongodb+srv://adnanr:gD7xTHl8ez4mxxuo@election.sj7eh.mongodb.net/")
print(client.list_database_names())
db = client['election-data'] # replace with your actual database name
print(db.list_collection_names())
collection = db['pres-elects']  # Use dictionary-style access to refer to collection with a hyphen
print(collection)

# API endpoint to query by year and state
@app.route('/api/elections', methods=['GET'])
@cross_origin()
def get_election_data():
    year = request.args.get('year')
    state = request.args.get('state')
    
    query = {'year': int(year), 'state': state.upper()}
    print(f"Incoming Year: {year}, Type: {type(year)}")
    print(f"Incoming State: {state}, Type: {type(state)}")
    print(f"MongoDB Query: {query}")
    # results = collection.find(query)
    
    # data = []
    # for result in results:
    #     result['_id'] = str(result['_id'])  # Convert ObjectId to string for JSON serialization
    #     data.append(result)
    # Fetch documents matching the query
    results = collection.find(query)
    print(results.retrieved)

    # Convert the cursor to a list to retrieve documents
    data = list(results)
    #print(data)
    return jsonify(data), 200


if __name__ == '__main__':
    app.run(debug=True)

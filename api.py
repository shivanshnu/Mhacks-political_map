from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

# MongoDB connection (replace with your credentials)
client = MongoClient("mongodb+srv://adnanr:gD7xTHl8ez4mxxuo@election.sj7eh.mongodb.net/")
db = client.election_data  # replace with your actual database name
collection = db.pres-elects  # replace with your actual collection name

# Helper function to convert MongoDB object to JSON
def mongo_json(obj):
    """ Convert MongoDB object to JSON-serializable format. """
    return {key: str(value) if isinstance(value, ObjectId) else value for key, value in obj.items()}

# API endpoint to query by year and state
# Test this
@app.route('/api/elections', methods=['GET'])
def get_election_data():
    # Get 'year' and 'state' parameters from the request query string
    year = request.args.get('year')  # Example: 1976
    state = request.args.get('state')  # Example: ALABAMA
    
    # Find matching documents in the MongoDB collection
    query = {'year': int(year), 'state': state.upper()}  # Ensure the year is an integer and state is uppercase
    results = collection.find(query)
    
    # Return the results as JSON
    data = []
    for result in results:
        result['_id'] = str(result['_id'])  # Convert ObjectId to string for JSON serialization
        data.append(result)
    
    return jsonify(data), 200

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

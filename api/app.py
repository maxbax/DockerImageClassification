from flask import Flask, jsonify, make_response, request
from classifier import classifyImage

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def test_response():

    sample_response = { "result": "" }
      
    if (request.files['image']): 

        file = request.files['image']

        classifyResult = classifyImage(file)

        sample_response = { "result": classifyResult }
        
        print('Model classification: ' + classifyResult)   
    
    # JSONify response
    response = make_response(jsonify(sample_response))

    # Add Access-Control-Allow-Origin header to allow cross-site request
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'

    return response

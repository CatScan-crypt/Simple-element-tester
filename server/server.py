from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import requests  # To handle URL requests

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read the length of the content and then the content itself
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            # Parse the incoming JSON data
            data = json.loads(post_data)

            # Extract the URL from the parsed JSON data
            url = data.get('url')

            if not url:
                # If the URL is missing, return a 400 error with a JSON message
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {'error': 'URL is required'}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return

            # Send a HEAD request to the URL to check its status
            response = requests.head(url, allow_redirects=True)

            # Send a 200 OK response with the status code in the JSON body
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            # Create the response JSON
            json_response = {'status': response.status_code}

            # Write the response to the client
            self.wfile.write(json.dumps(json_response).encode('utf-8'))

        except Exception as e:
            # If any error occurs, send a 500 error with an error message in JSON format
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'error': str(e)}
            self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle the OPTIONS method to enable CORS pre-flight requests
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')  # Allow POST and OPTIONS methods
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

# Start the server on port 3000
server_address = ('', 3000)
httpd = HTTPServer(server_address, RequestHandler)
print('Python server is running...')
httpd.serve_forever()

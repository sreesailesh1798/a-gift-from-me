import os
from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__, static_folder=".")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

# Endpoint that records when Sasmiithaa clicks YES!
@app.route("/api/she-said-yes", methods=["POST", "GET"])
def she_said_yes():
    data = request.get_json(silent=True) or {}
    print("\n" + "="*50)
    print("🎉❤️ CELEBRATION ALERT: SASMIITHAA SAID YES! ❤️🎉")
    print("="*50 + "\n")
    return jsonify({
        "status": "success",
        "message": "She said YES! The happiest day! ❤️"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

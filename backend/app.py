import json
from datetime import datetime
from apps import create_app
# from apps.orm import *
from gevent import pywsgi
import logging
from flask import Flask, jsonify, request
# from flask_cors import CORS

app = create_app()
from apps import db
# CORS(app, resources={r"/*": {"origins": "*"}})
with app.app_context():
    db.create_all()
    from apps.utils import create_highest_admin
    create_highest_admin()

if __name__ == '__main__':
    server = pywsgi.WSGIServer(('0.0.0.0', 5000), app)
    server.serve_forever()

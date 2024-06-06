import json
from datetime import datetime
from apps import create_app
from apps.orm import *
from gevent import pywsgi
import logging
from flask import Flask, jsonify, request
from apps.dao import get_info_student, get_info_of_account, get_info_teacher
from flask_cors import CORS

app = create_app()
from apps import db
CORS(app, resources={r"/*": {"origins": "*"}})
topic = 'testapp'

# id获取用户类型api
@app.route('/api/user_info', methods=['GET'])
def api_get_user_info():
    user_id = request.args.get('user_id')
    user_info = get_info_of_account(user_id)
    if user_info != "未找到该用户的账号":
        return jsonify(user_info)
    else:
        return jsonify({"error": "User not found"}), 404

# id获取学生信息api
@app.route('/api/stu_info', methods=['GET'])
def api_info_student():
    user_id = request.args.get('user_id')
    student_info = get_info_student(user_id)
    if student_info:
        return jsonify(student_info)
    else:
        return jsonify({"error": "User not found"}), 404

# id获取教师信息api
@app.route('/api/tea_info', methods=['GET'])
def api_info_teacher():
    user_id = request.args.get('user_id')
    teacher_info = get_info_teacher(user_id)
    if teacher_info:
        return jsonify(teacher_info)
    else:
        return jsonify({"error": "User not found"}), 404


if __name__ == '__main__':
    server = pywsgi.WSGIServer(('0.0.0.0', 5000), app)
    server.serve_forever()

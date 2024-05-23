from flask import Blueprint
from flask import request, make_response
from apps import db
from apps.orm import *
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_blue = Blueprint('users', __name__, url_prefix='/user')

@user_blue.route('/register', methods=['POST']) # 注册路由，向 /user/register 发送请求则会被此函数捕获
def register():
    reqData = request.get_json() # 获取请求数据
    username = reqData['username']
    password = reqData['password']
    email = reqData['email']
    dict0 = {}
    user_list = User.query.all() # 从数据库获取 User 表信息
    for it_user in user_list:
        if username == it_user.name or email == it_user.email: # 用户名或邮箱重复
            dict0["status"] = -1 # 返回错误状态码
            dict0["resp"] = "The username or email has already been registered!"
            return make_response(dict0, 200)
    # 插入新用户
    newUser = User(name=username, password=password, email=email)
    db.session.add(newUser) # 向数据库插入新数据
    db.session.commit() # 执行数据库提交
    dict0["status"] = 0
    dict0["resp"] = "Register Success!"
    return make_response(dict0, 200)

@user_blue.route('/login', methods=['POST']) # 登录路由，向 /user/login 发送请求则会被此函数捕获
def login():
    reqData = request.get_json() # 获取请求数据
    username = reqData['username']
    password = reqData['password']
    dict0 = {}
    user_list = User.query.filter(User.name == username).all() # 从数据库获取指定 用户名的 User 表信息
    if len(user_list) == 0:
        dict0["status"] = -1 # 返回错误状态码
        dict0["resp"] = "The user does not exist!"
        return make_response(dict0, 200)
    if user_list[0].name != username:
        dict0["status"] = -2 # 返回错误状态码
        dict0["resp"] = "The username is wrong!"
        return make_response(dict0, 200)
    if user_list[0].password != password:
        dict0["status"] = -3 # 返回错误状态码
        dict0["resp"] = "The password is wrong!"
        return make_response(dict0, 200)
    user_token = create_access_token(identity=user_list[0].id) # 创建 token(jwt) ，表明已登录状态
    dict0["status"] = 0
    dict0["resp"] = "Login Success!"
    dict0["token"] = user_token
    return make_response(dict0, 200)

@user_blue.route('/getUserInfo', methods=['GET'])
@jwt_required() # 需要请求携带 jwt ，即表明已登录状态
def getUserInfo():
    current_user_id = get_jwt_identity()
    user_list = User.query.filter(User.id == current_user_id).all()
    dict0 = {
        "status": 0,
        "username": user_list[0].name,
        "email": user_list[0].email
    }
    return make_response(dict0, 200)

@user_blue.route('/modifyName', methods=['POST'])
@jwt_required()
def modifyName():
    reqData = request.get_json()
    current_user_id = get_jwt_identity()
    newName = reqData['newname']
    dict0 = {}
    user_list = User.query.filter(User.name == newName).all()
    if user_list is None:
        dict0["status"] = -1
        dict0["resp"] = "The username has already been registered!"
        return make_response(dict0, 200)
    User.query.filter_by(id=current_user_id).update({'name':newName})
    db.session.commit()
    dict0["status"] = 0
    dict0["resp"] = "Modify Name Success!"
    return make_response(dict0, 200)

@user_blue.route('/modifyEmail', methods=['POST'])
@jwt_required()
def modifyEmail():
    reqData = request.get_json()
    current_user_id = get_jwt_identity()
    newEmail = reqData['newemail']
    dict0 = {}
    user_list = User.query.filter(User.email == newEmail).all()
    if user_list is None:
        dict0["status"] = -1
        dict0["resp"] = "The email has already been registered!"
        return make_response(dict0, 200)
    User.query.filter_by(id=current_user_id).update({'email':newEmail})
    db.session.commit()
    dict0["status"] = 0
    dict0["resp"] = "Modify Email Success!"
    return make_response(dict0, 200)

@user_blue.route('/modifyPassword', methods=['POST'])
@jwt_required()
def modifyPassword():
    reqData = request.get_json()
    current_user_id = get_jwt_identity()
    oldPassword = reqData['oldpassword']
    newPassword = reqData['newpassword']
    dict0 = {}
    user_list = User.query.filter(User.id == current_user_id).all()
    if user_list[0].password != oldPassword :
        dict0["status"] = -1
        dict0["resp"] = "The old password is wrong and the modification fails!"
        return make_response(dict0, 200)
    User.query.filter_by(id=current_user_id).update({'password':newPassword})
    db.session.commit()
    dict0["status"] = 0
    dict0["resp"] = "Modify Password Success!"
    return make_response(dict0, 200)
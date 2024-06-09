from flask import Blueprint
from flask import request, make_response
# from apps import db
# from backend.apps.utils.orm import *
from apps.utils import *
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_blue = Blueprint('users', __name__, url_prefix='/user')

# 获取用户信息
@jwt_required() # 需要请求携带 jwt ，即表明已登录状态 # TODO: debug 的时候可以先不用 jwt
@user_blue.route('/api_get_user_info', methods=['POST'])
def api_get_user_info():
    reqData = request.get_json() # 获取请求数据
    # current_user_id = get_jwt_identity() # TODO
    user_id = reqData['user_id']
    user_info = get_info_of_account(user_id)
    if user_info != "未找到该用户的账号":
        if user_info["identity"] == "student":
            user_info = get_info_student(user_id)
            user_info["status"] = 0
        elif user_info["identity"] == "teacher":
            user_info = get_info_teacher(user_id)
            user_info["status"] = 0
        elif user_info["identity"] == "administrator":
            user_info["status"] = 0
        else:
            user_info["status"] = -2
            user_info["error"] = "Undefined User Type"
        return make_response(user_info, 200)
    else:
        dict0 = {
            "status": -1,
            "error": "User not found"
        }
        return make_response(dict0, 200)

@user_blue.route('/register', methods=['POST']) # 注册路由，向 /user/register 发送请求则会被此函数捕获
def register():
    reqData = request.get_json() # 获取请求数据
    username = reqData['account']
    password = reqData['psword']
    email = reqData['email']
    identity = reqData['identity']
    dict0 = {}
    if identity == "student":
        new_id = create_student(username)
    elif identity == "teacher":
        new_id = create_teacher(username)
    elif identity == "admin":
        new_id = create_administrator()
    dict0["resp"] = create_account(new_id, username, password, email)
    if dict0["resp"] == "账号创建成功":
        dict0["status"] = 0
    else:
        dict0["status"] = -1 # 返回错误状态码
    return make_response(dict0, 200)

@user_blue.route('/login', methods=['POST']) # 注册路由，向 /user/register 发送请求则会被此函数捕获
def login():
    reqData = request.get_json() # 获取请求数据
    username = reqData['account']
    password = reqData['psword']
    identity = reqData['identity']
    ret = get_info_of_account(username)
    if type(ret) is dict:
        flag = (password == ret["password"]) and (identity == ret["identity"])
        if flag:
            user_token = create_access_token(identity=ret["user_id"]) # 创建 token(jwt) ，表明已登录状态
            ret["token"] = user_token
            ret["status"] = 0
            ret["resp"] = "登录成功"
            return make_response(ret, 200)
        else:
            dict0 = {}
            dict0["status"] = -2 # 返回错误状态码
            dict0["resp"] = "用户类型或密码错误"
    else:
        dict0 = {}
        dict0["status"] = -1 # 返回错误状态码
        dict0["resp"] = ret
    return make_response(dict0, 200)

# @user_blue.route('/getUserInfo', methods=['GET'])
# @jwt_required() # 需要请求携带 jwt ，即表明已登录状态
# def getUserInfo():
#     current_user_id = get_jwt_identity()
#     user_list = User.query.filter(User.id == current_user_id).all()
#     dict0 = {
#         "status": 0,
#         "username": user_list[0].name,
#         "email": user_list[0].email
#     }
#     return make_response(dict0, 200)

# @user_blue.route('/modifyName', methods=['POST'])
# @jwt_required()
# def modifyName():
#     reqData = request.get_json()
#     current_user_id = get_jwt_identity()
#     newName = reqData['newname']
#     dict0 = {}
#     user_list = User.query.filter(User.name == newName).all()
#     if user_list is None:
#         dict0["status"] = -1
#         dict0["resp"] = "The username has already been registered!"
#         return make_response(dict0, 200)
#     User.query.filter_by(id=current_user_id).update({'name':newName})
#     db.session.commit()
#     dict0["status"] = 0
#     dict0["resp"] = "Modify Name Success!"
#     return make_response(dict0, 200)

# @user_blue.route('/modifyEmail', methods=['POST'])
# @jwt_required()
# def modifyEmail():
#     reqData = request.get_json()
#     current_user_id = get_jwt_identity()
#     newEmail = reqData['newemail']
#     dict0 = {}
#     user_list = User.query.filter(User.email == newEmail).all()
#     if user_list is None:
#         dict0["status"] = -1
#         dict0["resp"] = "The email has already been registered!"
#         return make_response(dict0, 200)
#     User.query.filter_by(id=current_user_id).update({'email':newEmail})
#     db.session.commit()
#     dict0["status"] = 0
#     dict0["resp"] = "Modify Email Success!"
#     return make_response(dict0, 200)

# @user_blue.route('/modifyPassword', methods=['POST'])
# @jwt_required()
# def modifyPassword():
#     reqData = request.get_json()
#     current_user_id = get_jwt_identity()
#     oldPassword = reqData['oldpassword']
#     newPassword = reqData['newpassword']
#     dict0 = {}
#     user_list = User.query.filter(User.id == current_user_id).all()
#     if user_list[0].password != oldPassword :
#         dict0["status"] = -1
#         dict0["resp"] = "The old password is wrong and the modification fails!"
#         return make_response(dict0, 200)
#     User.query.filter_by(id=current_user_id).update({'password':newPassword})
#     db.session.commit()
#     dict0["status"] = 0
#     dict0["resp"] = "Modify Password Success!"
#     return make_response(dict0, 200)
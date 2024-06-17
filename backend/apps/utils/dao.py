# sxr 20240601
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from .orm import User, Account, Student, Teacher, Administrator, Classroom, Course, Schedule
from .orm import CourseSelection, CourseByelection, Grade, Comment, CommentTag, Evaluation, UpvoteUser, DownvoteUser
from enum import Enum
from sqlalchemy.exc import IntegrityError
from apps import db

from datetime import datetime

# TODO: need to create session in create_app() 需将与数据库的连接建立放在 create_app() 中实现
# db_user = ''
# db_password = ''
# db_host = ''
# db_port = '3306'  # MySQL默认端口为3306
# db_name = ''

# engine = create_engine(f'mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

# Session = sessionmaker(bind=engine)


# 注意事项
# 1. 如果查询函数返回的是一个list，list里的每个元素都是一个列表对象，可以对每个对象获取其对应的属性值
#   例：return grade_list
#       ...
#       for grade in grade_list:
#           print(grade.student_id, grade.course_id, grade.grade)
#
# 2. 如果查询函数返回的是一个列表对象，可以获取其对应的属性值
#   例：return grade
#       ...
#       print(grade.student_id, grade.course_id, grade.grade)
#
# 3. 所有函数均有返回值，返回值可能是list、列表对象或者汉字提示
# 4. 所有id均是INT类型


# 创建最高权限管理员
def create_highest_admin():
    if not db.session.query(Administrator).first():
        new_user = User(identity = 'administrator')
        new_admin = Administrator(administrator_id=new_user.user_id, user=new_user, is_highest_admin=1)
        db.session.add(new_admin)
        db.session.commit()
        ret = create_account(new_user.user_id, "admin", "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", "123456@zju.edu.cn")
        print(ret)


##### 请注意【账号】与【用户】的区别:【用户】是更底层的内容 #####
##### 用户可以没有账号，但只有用户才能创建账号，且每个用户只能创建一个账号 #####

########################### 1. Accounts #############################
# 创建账号 
# create_account(学号（工号）、用户名、密码) -> 操作成功或失败原因
# to do: limit for building an account of administrator
def create_account(user_id, name, password, email):
    existing_account = Account.query.filter_by(user_id=user_id).first()
    if existing_account:
        return "用户已经拥有账号"
    
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return "用户不存在"

    identity = user.identity

    if identity == 'student':
        account = Account(user_id=user_id, name=name, identity='student', password=password, email=email)
    elif identity == 'teacher':
        account = Account(user_id=user_id, name=name, identity='teacher', password=password, email=email)
    elif identity == 'administrator':
        account = Account(user_id=user_id, name=name, identity='administrator', password=password, email=email)
    else:
        raise ValueError("无效的身份信息")

    try:
        db.session.add(account)
        db.session.commit()
        return "账号创建成功"
    except IntegrityError:
        db.session.rollback()
        return "账号创建失败"

# 查询账号信息
# get_info_of_account(学号（工号）) -> [用户名、身份、密码信息]或失败原因
def get_info_of_account(name):
    account = Account.query.filter_by(name=name).first()
    if account:
        return {
            "user_id": account.user_id,
            "name": account.name,
            "identity": account.identity,
            "password": account.password,
            "email": account.email
        }
    else:
        return "未找到该用户的账号"

def get_info_of_account_by_id(user_id):
    account = Account.query.filter_by(user_id=user_id).first()
    if account:
        return {
            "user_id": account.user_id,
            "name": account.name,
            "identity": account.identity,
            "password": account.password,
            "email": account.email
        }
    else:
        return "未找到该用户的账号"

# 删除账号
# delete_account(学号（工号）) -> 操作成功或失败原因
def delete_account(user_id):
    account = Account.query.filter_by(user_id=user_id).first()
    if account:
        db.session.delete(account)
        db.session.commit()
        return "账号删除成功"
    else:
        return "未找到该用户的账号"
########################### 1. Accounts #############################


########################### 2. Students #############################
# 创建学生用户
# create_student(姓名（必要）、性别等（非必要）) -> 新创建的学生id
def create_student(name, realName=None, gender=None, birthday=None, contact_information=None, department=None):
    user = User(identity='student')
    student = Student(name=name, realName=realName, gender=gender, birthday=birthday, contact_information=contact_information, department=department, user=user)
    db.session.add(user)
    db.session.add(student)
    db.session.commit()
    student_id = student.student_id
    return student_id

# 删除学生用户
# delete_student(学号) -> 操作成功或失败原因
def delete_student(student_id):
    student = Student.query.get(student_id)
    if student:
        user = student.user
        db.session.delete(student)
        db.session.delete(user)
        db.session.commit()
    else:
        return "用户不存在"
    return "删除成功"

# 获取学生信息
def get_info_student(student_id):
    student = Student.query.filter_by(student_id=student_id).first()
    if student:
        if student.birthday:
            birthday_str = datetime.strftime(student.birthday, '%Y-%m-%d')
        else:
            birthday_str = ''
        return {
            'identity': 'student',
            'id': student.student_id,
            'name': student.name,
            'realName': student.realName,
            'gender': student.gender,
            'birthday': birthday_str,
            'contact': student.contact_information,
            'department': student.department
        }
    else:
        return None

# 更新学生用户的信息
# update_student_info(学号（需要更新的对象）、更新信息（支持部分更新）...) -> 更新成功或失败原因
def update_student_info(student_id, name=None, gender=None, 
                        birthday=None, contact_information=None, department=None):
    student = Student.query.get(student_id)
    if student:
        if name is not None:
            student.name = name
        if gender is not None:
            student.gender = gender
        if birthday is not None:
            student.birthday = birthday
        if contact_information is not None:
            student.contact_information = contact_information
        if department is not None:
            student.department = department

        db.session.commit()
        return "更新成功"
    else:
        return "用户不存在"
########################### 2. Students #############################


########################### 3. Teachers #############################
# 创建教师用户
# create_teacher(姓名（必要）、性别等（非必要）) -> 新创建的教师id
def create_teacher(name, realName=None, gender=None, birthday=None, contact_information=None, department=None):
    user = User(identity='teacher')
    teacher = Teacher(name=name, realName=realName, gender=gender, birthday=birthday, contact_information=contact_information, department=department, user=user)
    db.session.add(user)
    db.session.add(teacher)
    db.session.commit()
    teacher_id = teacher.teacher_id
    return teacher_id

# 删除教师用户
# delete_teacher(工号) -> 操作成功或失败原因
def delete_teacher(teacher_id):
    teacher = Teacher.query.get(teacher_id)
    if teacher:
        user = teacher.user
        db.session.delete(teacher)
        db.session.delete(user)
        db.session.commit()
    else:
        return "用户不存在"
    return "删除成功"

# 获取教师信息
def get_info_teacher(teacher_id):
    teacher = Teacher.query.filter_by(teacher_id=teacher_id).first()
    if teacher:
        if teacher.birthday:
            birthday_str = datetime.strftime(teacher.birthday, '%Y-%m-%d')
        else:
            birthday_str = ''
        return {
            'identity': 'teacher',
            'id': teacher.teacher_id,
            'name': teacher.name,
            'realName': teacher.realName,
            'gender': teacher.gender,
            'birthday': birthday_str,
            'contact': teacher.contact_information,
            'department': teacher.department
        }
    else:
        return None

# 更新教师用户的信息
# update_teacher_info(学号（需要更新的对象）、更新信息（支持部分更新）...) -> 更新成功或失败原因
def update_teacher_info(teacher_id, name=None, gender=None, 
                        birthday=None, contact_information=None, department=None):
    teacher = Teacher.query.get(teacher_id)
    if teacher:
        if name is not None:
            teacher.name = name
        if gender is not None:
            teacher.gender = gender
        if birthday is not None:
            teacher.birthday = birthday
        if contact_information is not None:
            teacher.contact_information = contact_information
        if department is not None:
            teacher.department = department

        db.session.commit()
        return "更新成功"
    else:
        return "用户不存在"
########################### 3. Teachers #############################


########################### 4. Administrators #############################
# 创建管理员用户
# create_administrator() -> 新创建的管理员id
# to do: only highest admin can create new administrator
def create_administrator():
    user = User(identity='administrator')
    administrator = Administrator(user=user)
    db.session.add(user)
    db.session.add(administrator)
    db.session.commit()
    administrator_id = administrator.administrator_id
    return administrator_id

# 删除管理员用户
# delete_administrator(管理员号) -> 操作成功或失败原因
def delete_administrator(administrator_id):
    administrator = Administrator.query.get(administrator_id)
    if administrator:
        if administrator.is_highest_admin:
            return "最高权限管理员不能被删除"
        else:
            user = administrator.user
            db.session.delete(administrator)
            db.session.delete(user)
            db.session.commit()
            return "删除成功"
    else:
        return "用户不存在"
########################### 4. Administrators #############################


########################### 5. Classrooms #############################
# 创建教室
# create_classroom(教室名、教室容量（均必要）) -> 新创建的教室id
def create_classroom(room_name, capacity):
    classroom = Classroom(room_name=room_name, capacity=capacity)
    db.session.add(classroom)
    db.session.commit()
    return classroom.room_id

# 删除教室
# delete_classroom(教室id) -> 操作成功或失败原因
def delete_classroom(room_id):
    classroom = Classroom.query.get(room_id)
    if classroom:
        db.session.delete(classroom)
        db.session.commit()
        return "删除成功"
    else:
        return "教室不存在"

# 更新教室的信息
# update_classroom_info(教室号（需要更新的对象）、更新信息（支持部分更新）...) -> 更新成功或失败原因
def update_classroom_info(room_id, new_room_name=None, new_capacity=None):
    classroom = Classroom.query.get(room_id)
    if classroom:
        if new_capacity is not None:
            classroom.capacity = new_capacity
        if new_room_name is not None:
            classroom.room_name = new_room_name
        db.session.commit()
        return "更新成功"
    else:
        return "教室不存在"
########################### 5. Classrooms #############################


########################### 6. Course #############################
# 创建课程
# create_course(课程名和学分（必要）、教师和教室id（外码，非必要）、其他信息（非必要）) -> 新创建的课程id
def create_course(course_name, credits, teacher_id, room_id, class_time=None, 
                  teaching_assistant=None, course_announcement=None, 
                  exam_time=None, exam_location=None, course_description=None, course_priority=None):
    course = Course(
        course_name=course_name,
        teacher_id=teacher_id,
        class_time=class_time,
        room_id=room_id,
        credits=credits,
        teaching_assistant=teaching_assistant,
        course_announcement=course_announcement,
        exam_time=exam_time,
        exam_location=exam_location,
        course_description=course_description,
        course_priority=course_priority
    )
    try:
        db.session.add(course)
        db.session.commit()
        return course.course_id
    except IntegrityError as e:
        db.session.rollback()
        print("外码引用错误:", e)

# 删除课程
def delete_course(course_id):
    course = Course.query.get(course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return "删除成功"
    else:
        return "课程不存在"
        
# 更新课程信息
def update_course_info(course_id, new_course_name=None, new_teacher_id=None, 
                       new_class_time=None, new_room_id=None, new_credits=None, 
                       new_teaching_assistant=None, new_course_announcement=None, 
                       new_exam_time=None, new_exam_location=None, new_course_description=None, new_course_priority=None):
    course = Course.query.get(course_id)
    if course:
        if new_course_name is not None:
            course.course_name = new_course_name
        if new_teacher_id is not None:
            course.teacher_id = new_teacher_id
        if new_class_time is not None:
            course.class_time = new_class_time
        if new_room_id is not None:
            course.room_id = new_room_id
        if new_credits is not None:
            course.credits = new_credits
        if new_teaching_assistant is not None:
            course.teaching_assistant = new_teaching_assistant
        if new_course_announcement is not None:
            course.course_announcement = new_course_announcement
        if new_exam_time is not None:
            course.exam_time = new_exam_time
        if new_exam_location is not None:
            course.exam_location = new_exam_location
        if new_course_description is not None:
            course.course_description = new_course_description
        if new_course_priority is not None:
            course.course_priority = new_course_priority
        
        try:
            db.session.commit()
            return "更新成功"
        except IntegrityError as e:
            db.session.rollback()
            print("外码引用错误:", e)
########################### 6. Course #############################


########################### 7. Schedules #############################
# 创建一个课程表项
# create_schedule(学生或教师id（学生选的课、教师教的课）、对应的课程id) -> 操作成功或失败原因
def create_schedule(user_id, course_id):
    existing_schedule = Schedule.query.filter_by(user_id=user_id, course_id=course_id).first()
    if existing_schedule:
        return "课程表项已存在，无法重复创建"
    else:
        new_schedule = Schedule(user_id=user_id, course_id=course_id)           
        try:
            db.session.add(new_schedule) 
            db.session.commit()
            return "课程表项创建成功"
        except IntegrityError as e:
            db.session.rollback()
            print("外码引用错误:", e)

# 根据user_id查询课表
# get_courses_from_Schedule_by_user_id(user_id) -> 一个list，记录了对应的列表项
def get_courses_from_Schedule_by_user_id(user_id):
    course_ids = db.session.query(Schedule.course_id).filter_by(user_id=user_id).all()
    return course_ids

# 删除一个课程表项
def delete_schedule(user_id, course_id):
    schedule = db.session.query(Schedule).filter_by(user_id=user_id, course_id=course_id).first()
    if schedule:
        db.session.delete(schedule)
        db.session.commit()
        return "删除成功"
    else:
        return "课程表项不存在"
########################### 7. Schedules #############################


########################### 8. course selection & byelection #############################
# 创建一个选课项
# create_course_selection(学号、要选的课程id、选课优先级 INT（默认第一志愿）) -> 操作成功或失败原因
def create_course_selection(student_id, course_id, choice_level):
    existing_selection = db.session.query(CourseSelection).filter_by(student_id=student_id, course_id=course_id).first()
    if existing_selection:
        return "选课记录已存在，无需重复添加"
    else:
        new_course_selection = CourseSelection(student_id=student_id, course_id=course_id, choice_level=choice_level)
        try:
            db.session.add(new_course_selection)
            db.session.commit()
            return "选课项创建成功"
        except IntegrityError as e:
            db.session.rollback()
            print("外码引用错误:", e)

# 根据student_id查询选课列表
# get_course_selections_by_student_id(user_id) -> 一个list，记录了对应的列表项
def get_course_selections_by_student_id(student_id):
    course_selections = db.session.query(CourseSelection).filter_by(student_id=student_id).all()
    return course_selections

# 根据course_id查询选了对应课程的学生列表
# get_students_from_selection_by_course_id(course_id) -> 一个list，记录了对应的列表项
def get_students_from_selection_by_course_id(course_id):
    students = db.session.query(CourseSelection).filter_by(course_id=course_id).all()
    return students

# 删除一个选课项
def delete_course_selection(student_id, course_id):
    course_selection = db.session.query(CourseSelection).filter_by(student_id=student_id, course_id=course_id).first()
    if course_selection:
        db.session.delete(course_selection)
        db.session.commit()
        return "删除成功"
    else:
        return "选课项不存在"

# 修改一个选课项的选课优先级（第几志愿）
# new_choice_level INT
def update_course_selection_choice_level(student_id, course_id, new_choice_level):
    course_selection = db.session.query(CourseSelection).filter_by(student_id=student_id, course_id=course_id).first()
    if course_selection:
        course_selection.choice_level = new_choice_level
        db.session.commit()
        return "修改成功"
    else:
        return "选课项不存在"

# 创建一个补选项
# create_course_byelection(学号、要补选的课程id、补选陈述（String(255)）) -> 操作成功或失败原因
def create_course_byelection(student_id, course_id, statement):
    existing_byelection = db.session.query(CourseByelection).filter_by(student_id=student_id, course_id=course_id).first()
    if existing_byelection:
        return "补选记录已存在，无需重复添加"
    else:
        new_course_byelection = CourseByelection(student_id=student_id, course_id=course_id, statement=statement)
        try:
            db.session.add(new_course_byelection)
            db.session.commit()
            return "补选项创建成功"
        except IntegrityError as e:
            db.session.rollback()
            print("外码引用错误:", e)

# 根据student_id查询补选列表
# get_course_selections_by_student_id(user_id) -> 一个list，记录了对应的列表项
def get_course_byelections_by_student_id(student_id):
    course_byelections = db.session.query(CourseByelection).filter_by(student_id=student_id).all()
    return course_byelections

# 根据course_id查询补选了对应课程的学生列表
# get_students_from_byelection_by_course_id(course_id) -> 一个list，记录了对应的列表项
def get_students_from_byelection_by_course_id(course_id):
    students = db.session.query(CourseByelection).filter_by(course_id=course_id).all()
    return students

# 删除一个补选项
def delete_course_byelection(student_id, course_id):
    course_byelection = db.session.query(CourseByelection).filter_by(student_id=student_id, course_id=course_id).first()
    if course_byelection:
        db.session.delete(course_byelection)
        db.session.commit()
        return "删除成功"
    else:
        return "补选项不存在"

# 修改一个补选项的补选陈述
# statement String(255)
def update_course_selection_choice_level(student_id, course_id, statement):
    course_byelection = db.session.query(CourseByelection).filter_by(student_id=student_id, course_id=course_id).first()
    if course_byelection:
        course_byelection.statement = statement
        db.session.commit()
        return "修改成功"
    else:
        return "补选项不存在"
########################### 8. course selection & byelection #############################



########################### 9. Grades #############################
# 创建一个成绩项
# create_grade(student_id, course_id, 成绩 INT) -> 操作成功或失败原因
def create_grade(student_id, course_id, grade):
    existing_schedule = db.session.query(Schedule).filter_by(user_id=student_id, course_id=course_id).first()
    if existing_schedule is None:
        return "该学生并未选择该课程"
    grade = db.session.query(Grade).filter_by(student_id=student_id, course_id=course_id).first()
    if grade:
        return "成绩项已存在，无需重复添加"
    else:
        new_grade = Grade(student_id=student_id, course_id=course_id, grade=grade)
        try:
            db.session.add(new_grade)
            db.session.commit()
            return "成绩项创建成功"
        except IntegrityError as e:
            db.session.rollback()
            print("外码引用错误:", e)

# 删除一个成绩项
def delete_grade(student_id, course_id):
    grade = db.session.query(Grade).filter_by(student_id=student_id, course_id=course_id).first()
    if grade:
        db.session.delete(grade)
        db.session.commit()
        return "删除成功"
    else:
        return "成绩项不存在"

# 根据student_id和course_id查询该学生某课程的成绩 -> 一个对应的列表项
def get_grade_by_student_and_course(student_id, course_id):
    grade = db.session.query(Grade).filter_by(student_id=student_id, course_id=course_id).first()
    return grade

# 根据student_id查询该学生的成绩列表
def get_grade_by_student_id(student_id):
    grade = db.session.query(Grade).filter_by(student_id=student_id).all()
    return grade

# 根据course_id查询该课程的成绩列表
def get_grade_by_course_id(course_id):
    grade = db.session.query(Grade).filter_by(course_id=course_id).all()
    return grade

# 修改一个成绩项的成绩
def update_grade(student_id, course_id, new_grade):
    grade = db.session.query(Grade).filter_by(student_id=student_id, course_id=course_id).first()
    if grade:
        grade.grade = new_grade
        db.session.commit()
        return "修改成功"
    else:
        return "成绩项不存在"
########################### 9. Grades #############################


########################### 10. Comments #############################
# 创建一个评论，每个学生对自己上的某门课和这门课的老师发表的唯一评论 -> 评论id
def create_comment(user_id, course_id, teacher_id, evaluation_id, tag_id, comment_time=None, 
                   teacher_response=None, comment_quality=None):
    new_comment = Comment(
        user_id=user_id, 
        course_id=course_id, 
        teacher_id=teacher_id, 
        comment_time=comment_time, 
        tag_id=tag_id, 
        teacher_response=teacher_response, 
        comment_quality=comment_quality, 
        evaluation_id=evaluation_id
    )
    try:
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.comment_id
    except IntegrityError as e:
        db.session.rollback()
        print("外码引用错误:", e)

# 删除一个评论
def delete_comment(comment_id):
    comment = db.session.query(Comment).filter_by(comment_id=comment_id).first()
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return "删除成功"
    else:
        return "评论不存在"

# 修改一个评论的教师回复和评论质量
# new_teacher_response Text; new_comment_quality INT
def update_comment(comment_id, new_teacher_response=None, new_comment_quality=None):
    comment = db.session.query(Comment).filter_by(comment_id=comment_id).first()
    if comment:
        if new_teacher_response is not None:
            comment.teacher_response = new_teacher_response
        if new_comment_quality is not None:
            comment.comment_quality = new_comment_quality
        db.session.commit()
        return "修改成功"
    else:
        return "评论不存在"

# 根据course_id查询该课程的评论列表 -> 一个list，记录了对应的列表项
def get_comments_by_course_id(course_id):
    comments = db.session.query(Comment).filter_by(course_id=course_id).all()
    return comments

# 根据student_id查询该学生发表的评论列表 -> 一个list，记录了对应的列表项
def get_comments_by_student_id(student_id):
    comments = db.session.query(Comment).filter_by(student_id=student_id).all()
    return comments
    
# 根据comment_id查询该评论 -> 一个对应的列表项
def get_comments_by_comment_id(comment_id):
    comment = db.session.query(Comment).filter_by(comment_id=comment_id).first()
    return comment
########################### 10. Comments #############################


########################### 11. CommentTags #############################
# 创建评论标签
# tag String(100) -> 标签id
def create_comment_tag(tag):
    new_comment_tag = CommentTag(tag=tag)
    try:
        db.session.add(new_comment_tag)
        db.session.commit()
        return new_comment_tag.tag_id
    except IntegrityError as e:
        db.session.rollback()
        print("外码引用错误:", e)

# 删除评论标签
def delete_comment_tag(tag_id):
    tag = db.session.query(CommentTag).get(tag_id)
    if tag:
        db.session.delete(tag)
        db.session.commit()
        return "删除成功"
    else:
        return "评论不存在"

# 查询评论标签 -> 一个对应的列表项
def get_tag_by_tag_id(tag_id):
    tag = db.session.query(CommentTag).filter_by(tag_id=tag_id).first()
    return tag
########################### 11. CommentTags #############################


########################### 12. Evaluations #############################
# 创建课程评价，每个学生对自己上的某门课和这门课的老师进行的唯一评价（评分）
# score INT -> 评价id
def create_evaluation(teacher_id, overall_score, score1=None, score2=None):
    new_evaluation = Evaluation(teacher_id=teacher_id, score1=score1, score2=score2, overall_score=overall_score)
    try:
        db.session.add(new_evaluation)
        db.session.commit()
        return new_evaluation.evaluation_id
    except IntegrityError as e:
        db.session.rollback()
        print("外码引用错误:", e)

# 根据评价id查询评价 -> 一个对应的列表项
def get_tag_by_tag_id(evaluation_id):
    evaluation = db.session.query(Evaluation).filter_by(evaluation_id=evaluation_id).first()
    return evaluation
    
# 根据教师id查询评价 -> 一个list，记录了对应的列表项
def get_tag_by_tag_id(teacher_id):
    evaluation = db.session.query(Evaluation).filter_by(teacher_id=teacher_id).all()
    return evaluation
########################### 12. Evaluations #############################


########################### 13. HighQualityCommentators #############################
# 标记一个高质量评论者
def create_high_quality_commentator(user_id):
    user = db.session.query(User).get(user_id)
    if user:
        user.is_HighQualityCommentator = 1
        db.session.commit()
        return "标记成功"
    else:
        return "用户不存在"

# 删除一个高质量评论者
def delete_high_quality_commentator(user_id):
    user = db.session.query(User).get(user_id)
    if user:
        user.is_HighQualityCommentator = 0
        db.session.commit()
        return "删除成功"
    else:
        return "用户不存在"
########################### 13. HighQualityCommentators #############################


########################### 14. Upvote & Downvote #############################
# 创建一个点赞记录
def create_upvote_user(comment_id, user_id):
    exist = db.session.query(UpvoteUser).filter_by(comment_id=comment_id, user_id=user_id).first()
    if exist:
        return "已有该点赞记录"
    upvote_user = UpvoteUser(comment_id=comment_id, user_id=user_id)
    db.session.add(upvote_user)
    db.session.commit()
    return "创建成功"

# 删除一个点赞记录
def delete_upvote_user(comment_id, user_id):
    upvote_user = db.session.query(UpvoteUser).filter_by(comment_id=comment_id, user_id=user_id).first()
    if upvote_user:
        db.session.delete(upvote_user)
        db.session.commit()
        return "删除成功"
    else:
        return "点赞记录不存在"

# 创建一个点踩记录
def create_downvote_user(comment_id, user_id):
    exist = db.session.query(DownvoteUser).filter_by(comment_id=comment_id, user_id=user_id).first()
    if exist:
        return "已有该点踩记录"
    downvote_user = DownvoteUser(comment_id=comment_id, user_id=user_id)
    db.session.add(downvote_user)
    db.session.commit()
    return "创建成功"
    
# 删除一个点踩记录
def delete_downvote_user(comment_id, user_id):
    downvote_user = db.session.query(DownvoteUser).filter_by(comment_id=comment_id, user_id=user_id).first()
    if downvote_user:
        db.session.delete(downvote_user)
        db.session.commit()
        return "删除成功"
    else:
        return "点踩记录不存在"

# 查询该评论的所有点赞用户 -> 一个list，记录了对应的列表项
def get_all_upvote_users(comment_id):
    upvote_users = db.session.query(UpvoteUser).filter_by(comment_id=comment_id).all()
    return upvote_users
    
# 查询该评论的所有点踩用户 -> 一个list，记录了对应的列表项
def get_all_downvote_users(comment_id):
    downvote_users = db.session.query(DownvoteUser).filter_by(comment_id=comment_id).all()
    return downvote_users
########################### 14. Upvote & Downvote #############################


# if __name__ == "__main__":
#     Base.metadata.create_all(engine)  # 创建表结构
#     result = create_account(user_id=1, name='Alice', password='123456')
#     print(result)


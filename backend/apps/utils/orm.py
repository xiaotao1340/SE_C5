from xmlrpc.client import Boolean
from sqlalchemy import Column, Integer, String, Enum, Date, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from apps import db

# Base = declarative_base()

class User(db.Model):
    __tablename__ = 'Users'

    user_id = Column(Integer, primary_key=True)
    identity = Column(Enum('student', 'teacher', 'administrator'))
    is_HighQualityCommentator = Column(Integer, default=0)

class Account(db.Model):
    __tablename__ = 'Accounts'

    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    identity = Column(Enum('student', 'teacher', 'administrator'))
    password = Column(String(100))

    user = relationship(User)

class Student(db.Model):
    __tablename__ = 'Students'

    student_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    gender = Column(Enum('male', 'female', 'unknown'))
    birthday = Column(Date)
    contact_information = Column(String(100))
    department = Column(String(100))

    user = relationship(User)

class Teacher(db.Model):
    __tablename__ = 'Teachers'

    teacher_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    gender = Column(Enum('male', 'female', 'unknown'))
    birthday = Column(Date)
    contact_information = Column(String(100))
    department = Column(String(100))

    user = relationship(User)

class Administrator(db.Model):
    __tablename__ = 'Administrators'

    administrator_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    is_highest_admin = Column(Integer, default=0)
    
    user = relationship(User)

class Classroom(db.Model):
    __tablename__ = 'Classrooms'

    room_id = Column(Integer, primary_key=True)
    room_name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)

class Course(db.Model):
    __tablename__ = 'Courses'

    course_id = Column(Integer, primary_key=True)
    course_name = Column(String(100), nullable=False)
    teacher_id = Column(Integer, ForeignKey('Teachers.teacher_id'))
    class_time = Column(String(100))
    room_id = Column(Integer, ForeignKey('Classrooms.room_id'))
    credits = Column(Integer, nullable=False)
    teaching_assistant = Column(String(100))
    course_announcement = Column(String(255))
    exam_time = Column(String(100))
    exam_location = Column(String(100))
    course_description = Column(String(255))
    course_priority = Column(Integer)

    teacher = relationship(Teacher)
    room = relationship(Classroom)


class Schedule(db.Model):
    __tablename__ = 'Schedules'

    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)

    user = relationship(User)
    course = relationship(Course)

class CourseSelection(db.Model):
    __tablename__ = 'Course_selection'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    choice_level = Column(Integer, default=1)

    student = relationship(Student)
    course = relationship(Course)

class CourseByelection(db.Model):
    __tablename__ = 'Course_byelection'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    statement = Column(String(255))

    student = relationship(Student)
    course = relationship(Course)

class Grade(db.Model):
    __tablename__ = 'Grades'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    grade = Column(Integer)

    student = relationship(Student)
    course = relationship(Course)

class Comment(db.Model):
    __tablename__ = 'Comments'

    comment_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'))
    course_id = Column(Integer, ForeignKey('Courses.course_id'))
    teacher_id = Column(Integer, ForeignKey('Teachers.teacher_id'))
    comment_time = Column(DateTime)
    tag_id = Column(Integer, ForeignKey('Comment_tags.tag_id'))
    teacher_response = Column(Text)
    comment_quality = Column(Integer)
    evaluation_id = Column(Integer, ForeignKey('Evaluation.evaluation_id'))

    user = relationship(User)
    course = relationship(Course)
    teacher = relationship(Teacher)
    tag = relationship('CommentTag')
    evaluation = relationship('Evaluation')

class CommentTag(db.Model):
    __tablename__ = 'Comment_tags'

    tag_id = Column(Integer, primary_key=True)
    tag = Column(String(100))

class Evaluation(db.Model):
    __tablename__ = 'Evaluation'

    evaluation_id = Column(Integer, primary_key=True)
    teacher_id = Column(Integer, ForeignKey('Teachers.teacher_id'))
    score1 = Column(Integer)
    score2 = Column(Integer)
    overall_score = Column(Integer, nullable=False)

    teacher = relationship(Teacher)

class UpvoteUser(db.Model):
    __tablename__ = 'Upvote_users'

    comment_id = Column(Integer, ForeignKey('Comments.comment_id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)

    comment = relationship(Comment)
    user = relationship(User)

class DownvoteUser(db.Model):
    __tablename__ = 'Downvote_users'

    comment_id = Column(Integer, ForeignKey('Comments.comment_id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)

    comment = relationship(Comment)
    user = relationship(User)
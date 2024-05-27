from sqlalchemy import Column, Integer, String, Enum, Date, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'Users'

    user_id = Column(Integer, primary_key=True)

class Account(Base):
    __tablename__ = 'Accounts'

    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    identity = Column(Enum('student', 'teacher', 'administrator'))
    password = Column(String(100))

    user = relationship(User)

class Student(Base):
    __tablename__ = 'Students'

    student_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    gender = Column(Enum('male', 'female', 'unknown'))
    birthday = Column(Date)
    contact_information = Column(String(100))
    department = Column(String(100))

    user = relationship(User)

class Teacher(Base):
    __tablename__ = 'Teachers'

    teacher_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    name = Column(String(50), nullable=False)
    gender = Column(Enum('male', 'female', 'unknown'))
    birthday = Column(Date)
    contact_information = Column(String(100))
    department = Column(String(100))

    user = relationship(User)

class Administrator(Base):
    __tablename__ = 'Administrators'

    administrator_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)

    user = relationship(User)

class Classroom(Base):
    __tablename__ = 'Classrooms'

    room_id = Column(Integer, primary_key=True)
    capacity = Column(Integer, nullable=False)

class Course(Base):
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

class Schedule(Base):
    __tablename__ = 'Schedules'

    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)

    user = relationship(User)
    course = relationship(Course)

class CourseSelection(Base):
    __tablename__ = 'Course_selection'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    choice_level = Column(Integer, default=1)

    student = relationship(Student)
    course = relationship(Course)

class CourseByelection(Base):
    __tablename__ = 'Course_byelection'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    statement = Column(String(255))

    student = relationship(Student)
    course = relationship(Course)

class Grade(Base):
    __tablename__ = 'Grades'

    student_id = Column(Integer, ForeignKey('Students.student_id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('Courses.course_id'), primary_key=True)
    grade = Column(Integer)

    student = relationship(Student)
    course = relationship(Course)

class Comment(Base):
    __tablename__ = 'Comments'

    comment_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'))
    course_id = Column(Integer, ForeignKey('Courses.course_id'))
    teacher_id = Column(Integer, ForeignKey('Teachers.teacher_id'))
    comment_time = Column(DateTime)
    tag_id = Column(Integer, ForeignKey('Comment_tags.tag_id'))
    upvote_user_id = Column(Integer, ForeignKey('Users.user_id'))
    downvote_user_id = Column(Integer, ForeignKey('Users.user_id'))
    teacher_response = Column(Text)
    comment_quality = Column(Integer)
    evaluation_id = Column(Integer, ForeignKey('Evaluation.evaluation_id'))

    user = relationship(User)
    course = relationship(Course)
    teacher = relationship(Teacher)
    tag = relationship('CommentTag')
    upvote_user = relationship(User, foreign_keys=[upvote_user_id])
    downvote_user = relationship(User, foreign_keys=[downvote_user_id])
    evaluation = relationship('Evaluation')

class CommentTag(Base):
    __tablename__ = 'Comment_tags'

    tag_id = Column(Integer, primary_key=True)
    tag = Column(String(100))

class Evaluation(Base):
    __tablename__ = 'Evaluation'

    evaluation_id = Column(Integer, primary_key=True)
    teacher_id = Column(Integer, ForeignKey('Teachers.teacher_id'))
    score1 = Column(Integer)
    score2 = Column(Integer)
    overall_score = Column(Integer, nullable=False)

    teacher = relationship(Teacher)

class HighQualityCommentator(Base):
    __tablename__ = 'High_quality_commentators'

    hqc_id = Column(Integer, primary_key=True)
    comment_id = Column(Integer, ForeignKey('Comments.comment_id'))

    user = relationship(User, foreign_keys=[hqc_id])
    comment = relationship(Comment)


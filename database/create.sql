create database EDU;

use EDU;

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    identity ENUM('student', 'teacher', 'administrator'),
    is_HighQualityCommentator INT DEFAULT 0
);

CREATE TABLE Accounts (
    user_id INT PRIMARY KEY,
    name CHAR(50) NOT NULL,
    identity ENUM('student', 'teacher', 'administrator'),
    password VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name CHAR(50) NOT NULL,
    gender ENUM('male', 'female', 'unknown'),
    birthday DATE,
    contact_information VARCHAR(100),
    department VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
);

CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY,
    name CHAR(50) NOT NULL,
    gender ENUM('male', 'female', 'unknown'),
    birthday DATE,
    contact_information VARCHAR(100),
    department VARCHAR(100),
    FOREIGN KEY (teacher_id) REFERENCES Users(user_id)
);

CREATE TABLE Administrators (
    Administrator_id INT PRIMARY KEY,
    FOREIGN KEY (Administrator_id) REFERENCES Users(user_id)
);

CREATE TABLE Classrooms (
    room_id INT PRIMARY KEY,
    capacity INT NOT NULL
);

CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    teacher_id INT,
    class_time VARCHAR(100),
    room_id INT,
    credits INT NOT NULL,
    teaching_assistant VARCHAR(100),
    course_announcement VARCHAR(255),
    exam_time VARCHAR(100),
    exam_location VARCHAR(100),
    course_description VARCHAR(255),
    course_priority INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (room_id) REFERENCES Classrooms(room_id)
);

CREATE TABLE Schedules (
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Course_selection (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    choice_level INT DEFAULT 1,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Course_byelection (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    statement VARCHAR(255),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Grades (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Comment_tags (
    tag_id INT NOT NULL,
    tag VARCHAR(100),
    PRIMARY KEY (tag_id)
);

CREATE TABLE Evaluation (
    evaluation_id INT,
    teacher_id INT,
    score1 INT,
    score2 INT,
    overall_score INT NOT NULL,
    PRIMARY KEY (evaluation_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

CREATE TABLE Comments (
    comment_id INT,
    user_id INT,
    course_id INT,
    teacher_id INT,
    comment_time DATETIME,
    tag_id INT,
    teacher_response TEXT,
    comment_quality INT,
    evaluation_id INT,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (tag_id) REFERENCES Comment_tags(tag_id),
    FOREIGN KEY (evaluation_id) REFERENCES Evaluation(evaluation_id)
);

CREATE TABLE Upvote_users (
    comment_id INT,
    user_id INT,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Downvote_users (
    comment_id INT,
    user_id INT,
    PRIMARY KEY (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES Comments(comment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

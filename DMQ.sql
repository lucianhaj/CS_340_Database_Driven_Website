DELETE FROM Students WHERE StudentID = :student_clicked_by_user
UPDATE Students SET GPA = :new_gpa_input WHERE Students.StudentID = :student_clicked_by_user;
DELETE FROM StudentsTeachers WHERE sid = :student_clicked_by_user
UPDATE Students SET MajorID = NULL WHERE Students.StudentID = :student_clicked_by_user
INSERT INTO Students VALUES (:student_id_input , :gpa_input, :name_input, :major_input);
INSERT INTO StudentsTeachers (sid,tid) VALUE (:student_id_input, :teacher_id_input);

--  Departments 
INSERT INTO departments(funding, name) VALUES (:funding, :name);
UPDATE Departments SET funding=:new_value WHERE departID = selected_departID;
DELETE FROM Departments WHERE departID = selected_departID;
-- Teachers
INSERT INTO Teachers( departID, subject, name) VALUES ( :departID, :subject,:name);
UPDATE Teachers SET departID = new_departID, subject = new_subject WHERE teacherID = selected_teacherID;
DELETE FROM Teachers WHERE teacherID = selected_teacherID;



DELETE FROM Students WHERE StudentID = :student_clicked_by_user
UPDATE Students SET GPA = :new_gpa_input WHERE Students.StudentID = :student_clicked_by_user;
DELETE FROM StudentsTeachers WHERE sid = :student_clicked_by_user
UPDATE Students SET MajorID = NULL WHERE Students.StudentID = :student_clicked_by_user
INSERT INTO Students VALUE (:student_id_input , :gpa_input, :name_input, :major_input);
INSERT INTO StudentsTeachers (sid,tid) VALUE (:student_id_input, :teacher_id_input);

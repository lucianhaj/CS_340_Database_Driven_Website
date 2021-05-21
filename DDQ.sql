
CREATE TABLE `GraduationPlan` (
    `Program` varchar(255) NOT NULL,
    `MajorID` int(11),
     PRIMARY KEY (`Program`)
 )ENGINE=InnoDB;

create table Departments(
  departID int primary key auto_increment not null,
  funding decimal(16,2)  ,
  name varchar(50)  not null,
  unique(departID)
);

create table if not exists Teachers(
    teacherID int auto_increment not null primary key,
    departID int ,
    subject varchar(50) default null,
    name varchar(50) not null,
    foreign key (departID) REFERENCES Departments(departID) on delete cascade on update cascade,
    unique(teacherID)
);

CREATE TABLE `Majors`(
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(255),
    `CreditsRequired` int(11) DEFAULT NULL,
    `ElectivesRequired` int(11) DEFAULT NULL,
    `Degree` varchar(255) NOT NULL,
     PRIMARY KEY (`ID`),
     KEY `Name` (`Name`),
     CONSTRAINT FOREIGN KEY (`Name`) REFERENCES `Plans` (`MajorName`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `Students` (
    `StudentID` int(11) NOT NULL AUTO_INCREMENT,
    `GPA` int(11) ,
    `Name` varchar(255) NOT NULL,
    `MajorID` int(11) DEFAULT NULL,
     PRIMARY KEY (`StudentID`),
     KEY `MajorID` (`MajorID`),
     CONSTRAINT `Students_fk_2` FOREIGN KEY (`MajorID`) REFERENCES `Majors` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `StudentsTeachers` (
  `sid` int(11) NOT NULL DEFAULT '0',
  `tid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sid`,`tid`),
  KEY `sid` (`sid`),
  CONSTRAINT FOREIGN KEY (`sid`) REFERENCES `Students` (`StudentID`),
  CONSTRAINT FOREIGN KEY (`tid`) REFERENCES `teachers` (`teacherID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into Departments(name, funding) values("Computer Science", 112220), ("Agriculture", 123000), ("Science", 500000);
INSERT INTO Majors VALUES (1, 120, 'Computer Science', 20, 'Undergrad'), (2, 120, 'Marketing', 15, 'Undergrad'), (3, 140, 'Mechanical', 15, 'Undergrad'), (4, 100, 'Artifical Intelligence', 10, 'Graduate');

INSERT INTO Teachers(name, subject, departID) VALUES('Mike', 'CS320', '3');
insert into Plans(Program, MajorName) values("Engineering",'Artifical Intelligence'),('Engineering','Computer Science'),(Buisness', 'Marketing'),('Engineering', 'Mechanical');
INSERT INTO teachers (teacherID, departID, subject, name) VALUES (1, 2, 'Chemistry', 'Schabb'), (2, 2, 'Physics', 'Einstein'), (3, 1, 'Math', 'Phil');
INSERT INTO Students (StudentID, GPA, Name, MajorID) VALUES (1, 3, 'John', 2), (2, 3, 'Frank', 2), (3, 4, 'Ann', 1);

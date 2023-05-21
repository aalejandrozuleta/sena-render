drop database if exists senaRender;
create database senaRender;
use senaRender;

drop table if exists registro;
drop table if exists tipos;
drop table if exists cursos;
drop table if exists horarios;

create table tipos (
    id int primary key auto_increment,
    descripcion varchar(20)
);

create table cursos (
    id int primary key auto_increment,
    curso varchar(60)
);

create table horarios (
    id int primary key auto_increment,
    dia varchar(20),
    hora varchar(6)
);

create table registro (
    id int primary key auto_increment,
    nombre varchar(30),
    apellido varchar(20),
    edad int,
    cedula int,
    correo varchar(50),
    contrasena varchar(50),
    curso_fk int,
    tipoUsuarios_fk int,
    horarios_fk int,
    foreign key (tipoUsuarios_fk) references tipos (id),
    foreign key (curso_fk) references cursos (id),  
    foreign key (horarios_fk) references horarios (id)
);

insert into tipos (descripcion) values ('instructor'), ('tripulante');
insert into cursos (curso) values ('adso'),('administracion'),('adsi'),('educacion fisica'),('ingles');
insert into horarios (dia, hora) values ('lunes','10:00'),('martes','14:00'),('miercoles','16:00'),('jueves','18:00');

insert into registro (nombre, correo, contrasena) values ('admin', 'admin@gmail.com', 'admin');

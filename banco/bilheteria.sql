drop database if exists bilheteria;
create database bilheteria
default collate utf8_general_ci
default character set utf8;

use bilheteria;

drop table if exists evento;
create table if not exists evento(
	idShow int unsigned not null auto_increment primary key,
    nome varchar(250)
)default charset=utf8 Engine=InnoDB;

drop table if exists ingresso;
create table if not exists ingresso(
	idIngresso int unsigned not null auto_increment primary key,
    tipo int unsigned not null,
    dia date not null,
    caminho varchar(500),
    descricao varchar(3200),
    constraint FK_INGRESSO_EVENTO foreign key(tipo) references evento(idShow)
)default charset=utf8 Engine=InnoDB;

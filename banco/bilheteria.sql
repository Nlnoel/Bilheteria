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

drop table if exists compras;
create table if not exists compras(
	idCompra int unsigned not null auto_increment primary key,
    ingresso int unsigned not null,
    constraint FK_COMPRAS_INGRESSO foreign key(ingresso) references ingresso(idIngresso)
)default charset=utf8 Engine=InnoDB;

-- Inserção de dados exemplo previamente cadastrados
INSERT INTO evento (idShow, nome) VALUES
(1, 'Marron'),
(2, 'Hillsong'),
(3, 'Rag\'n\'Bone Man'),
(4, 'Shawn Mendes'),
(5, 'Link Park'),
(6, 'Bruno Mars');

INSERT INTO ingresso (idIngresso, tipo, dia, caminho, descricao) VALUES
(1, 1, '2020-01-01', 'imagens/shows/Marron.jpg', 'Maroon 5 é uma banda estadunidense de pop. O vocalista, guitarrista e principal compositor é Adam Levine.'),
(2, 2, '2020-02-11', 'imagens/shows/Hillsong.jpg', 'Hillsong United é uma banda australiana de adoração que originou da Hillsong Church, que produz música voltada para o público cristão jovem.'),
(3, 3, '2020-05-25', 'imagens/shows/Rag\'n\'Bone Man.jpg', 'Rag\'n\'Bone Man nome artístico de Rory Charles Graham, é um cantor e compositor Britânico.'),
(4, 4, '2020-06-16', 'imagens/shows/Shawn Mendes.jpg', 'Shawn Peter Raul Mendes é um cantor e compositor canadense.'),
(5, 5, '2031-01-15', 'imagens/shows/Link Park.jpg', 'Linkin Park é uma banda rock estadunidense. O grupo estourou com o álbum Hybrid Theory (2000), com as músicas \" Crawling\" e \"One Step Under\".'),
(6, 6, '2019-12-09', 'imagens/shows/Bruno Mars.jpg', 'Peter Gene Hernandez, mais conhecido pelo nome artístico Bruno Mars é um cantor, compositor, produtor musical, dançarino e multi-instrumentista american.');


use `stock_market`;

CREATE TABLE `companies` (
  `symbol` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `marketcap` float(20,2) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `industry` varchar(200) NOT NULL,
  PRIMARY KEY (`symbol`)
)

CREATE TABLE `time_series_daily` (
  `date` date NOT NULL,
  `open` float(20,4) NOT NULL,
  `high` float(20,4) NOT NULL,
  `low` float(20,4) NOT NULL,
  `close` float(20,4) NOT NULL,
  `volume` int(11) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  PRIMARY KEY (`date`,`symbol`),
  KEY `symbol` (`symbol`),
  CONSTRAINT `time_series_daily_ibfk_1` FOREIGN KEY (`symbol`) REFERENCES `companies` (`symbol`)
)

CREATE TABLE `time_series_intraday` (
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `open` float(20,4) NOT NULL,
  `high` float(20,4) NOT NULL,
  `low` float(20,4) NOT NULL,
  `close` float(20,4) NOT NULL,
  `volume` int(11) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  PRIMARY KEY (`timestamp`,`symbol`),
  KEY `symbol` (`symbol`),
  CONSTRAINT `time_series_intraday_ibfk_1` FOREIGN KEY (`symbol`) REFERENCES `companies` (`symbol`)
)

create table user(
`firstName` varchar(100) not null,
`lastName` varchar(100),
`email` varchar(100) not null,
`passwordHash` varchar(200),
`aboutMe` varchar(500),
primary key(`email`)
)

create table token(
  `email` varchar(100) not null,
  `token` varchar(400) not null,
  `createdAt` date not null,
  primary key(`email`,`token`)
);
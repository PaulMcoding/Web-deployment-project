-- <!-- Code by C21437002 William Moore and C213591216 Paul Murnane -->

drop table favourite;
drop table webseller;
drop table car; 
drop table webusers;
drop table make;

CREATE TABLE webusers (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT null unique,
    user_pass VARCHAR(255) NOT null
);

create table make (
makeid serial primary key,
makename varchar(100)
);

CREATE TABLE car (
	car_id SERIAL PRIMARY KEY,
    makeid       int references make(makeid),
    seller_id    int references webusers(user_id),
    car_model    VARCHAR(20) NOT NULL,
    car_price    numeric(9, 2) NOT NULL,
    car_year     VARCHAR(4) NOT NULL,
    car_miles    VARCHAR(8) NOT NULL,
    car_location VARCHAR(100) NOT NULL,
    car_desc     varchar(250) NOT NULL,
    car_image    VARCHAR(1000) NOT NULL
);

create table favourite(
	user_id int references webusers(user_id),
	car_id int references car(car_id)
);

create table webseller(
	seller_id int references webusers(user_id),
	user_id int references webusers(user_id),
	car_id int references car(car_id),
	seller_message varchar(250)
);

insert into make(makename) values('Honda');
insert into make(makename) values('Nissan');
insert into make(makename) values('BMW');
insert into make(makename) values('Toyota');
insert into make(makename) values('Mercedes');
insert into make(makename) values('Ineos');
insert into make(makename) values('Porsche');
insert into make(makename) values('Aston Martin');
insert into make(makename) values('Hyundai');

select * from car left join MAKE using(makeid);
select * from make;
select * from webusers;
select * from webseller;
select * from favourite;


SELECT * FROM car left join make using(makeid);
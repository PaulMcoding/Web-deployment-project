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
	car_model int references car(car_id)
);

create table webseller(
	seller_id int references webusers(user_id),
	user_id int references webusers(user_id),
	car_id int references car(car_id),
	seller_message varchar(250)
);


insert into webusers(user_email, user_pass) values ('NewBuyer@gmail.com', 'NewBuyer');
insert into webusers(user_email, user_pass) values ('NewSeller@gmail.com', 'NewSeller');

insert into make(makename) values('Honda');
insert into make(makename) values('Nissan');
insert into make(makename) values('BMW');
insert into make(makename) values('Toyota');
insert into make(makename) values('Mercedes');
insert into make(makename) values('Ineos');
insert into make(makename) values('Porsche');
insert into make(makename) values('Aston Martin');
insert into make(makename) values('Hyundai');

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(1, 'Acty', 6548.99, '1989', '123573', 'Galway', 'A small Kei truck perfectly suited for any urban roadtrip, you can put a bike in the back and go to the mountains for a great day out with this little japanese truck',
'https://japanesenostalgiccar.com/wordpress/wp-content/uploads/2022/08/Honda-Acty-4WD-Attack-1988.jpg', 1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(2, '180sx', 23000.00, '1992', '142000', 'Louth', 'Perfect drift car', 'https://powervehicles.com/wp-content/uploads/2022/11/180sx-17.jpg', 1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image, seller_id)
values(2, 'Skyline r32', 64555.99, '1994', '101486', 'Dublin', 'marvel of engineering', 'https://car-images.bauersecure.com/wp-images/1372/1056x594/skyline_01.jpg', 1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image, seller_id)
values(3, 'M5 Competition', 64555.99, '1994', '101486', 'Dublin', 'German automitve perfection', 'https://www.topgear.com/sites/default/files/cars-car/carousel/2020/10/p90403633_highres_bmw-m5-competition.jpg',1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image, seller_id)
values(6, 'Grenadier', 84500.00, '2023', '0', 'London', 'Big land cruising monster', 'https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/such2o29cjotnluoe540', 1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(7, 'GT3RS', 223800, '2021', '2475', 'Dublin', 'Porsche race car for the road', 'https://smgmedia.blob.core.windows.net/images/129280/1920/porsche-911-gt3-coupe-10814f193b36.jpg',1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(8, 'DB9', 84950.00, '2015', '27870', 'Cork', 'Perfect if your a businessman', 'https://assets.newatlas.com/dims4/default/30e5a82/2147483647/strip/true/crop/1280x720+0+31/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Faston-martin-db9-2013.jpg', 1);

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(4, 'GR Corolla', 37195.00, '2022', '47650', 'Wexford', 'Good daily', 'https://www.topgear.com/sites/default/files/2022/06/1-Toyota-Corolla-GR-Morizo-Edition.jpg',1 );

insert into car(makeid, car_model, car_price, car_year, car_miles, car_location, car_desc, car_image ,seller_id)
values(9, 'N Vision 74', 198000.00, '2025', '0', 'SEMA, Las Vegas', 'A new car to the scene with styling from old mixed with new technology of today', 'https://www.topgear.com/sites/default/files/2023/05/1%20Hyundai%20N%20Vision%2074.jpg',1);

select * from car;
select * from make;
select * from webusers;
select * from webseller;

SELECT * FROM car left join make using(makeid);
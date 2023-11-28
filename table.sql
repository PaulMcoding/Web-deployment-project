CREATE TABLE webusers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    u_pass VARCHAR(255) NOT NULL
);

CREATE TABLE car (
	car_id SERIAL PRIMARY KEY,
    car_make     VARCHAR(20) NOT NULL,
    car_model    VARCHAR(20) NOT NULL,
    car_price    numeric(9, 2) NOT NULL,
    car_year     VARCHAR(4) NOT NULL,
    car_miles    VARCHAR(8) NOT NULL,
    car_location VARCHAR(100) NOT NULL,
    car_sold     CHAR(1) NOT NULL,
    car_image    VARCHAR(255) NOT NULL
);

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Honda', 'Acty', 6548.99, '1989', '123573', 'Galway', 0, 'https://japanesenostalgiccar.com/wordpress/wp-content/uploads/2022/08/Honda-Acty-4WD-Attack-1988.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Nissan', '180sx', 23000.00, '1992', '142000', 'Louth', 0, 'https://powervehicles.com/wp-content/uploads/2022/11/180sx-17.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Nissan', 'Skyline r32', 64555.99, '1994', '101486', 'Dublin', 0, 'https://car-images.bauersecure.com/wp-images/1372/1056x594/skyline_01.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Ineos', 'Grenadier', 84500.00, '2023', '0', 'London', 0, 'https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/such2o29cjotnluoe540');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Porsche', 'GT3RS', 223800, '2021', '2475', 'Dublin', 0, 'https://smgmedia.blob.core.windows.net/images/129280/1920/porsche-911-gt3-coupe-10814f193b36.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Aston Martin', 'DB9', 84950.00, '2015', '27870', 'Cork', 0, 'https://assets.newatlas.com/dims4/default/30e5a82/2147483647/strip/true/crop/1280x720+0+31/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Faston-martin-db9-2013.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('Toyota', 'GR Corolla', 37195.00, '2022', '47650', 'Wexford', 0, 'https://www.topgear.com/sites/default/files/2022/06/1-Toyota-Corolla-GR-Morizo-Edition.jpg');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('', '', , '', '', '', 0, '');

insert into car(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_image)
values('', '', , '', '', '', 0, '');
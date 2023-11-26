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

insert into car_info(car_make, car_model, car_price, car_year, car_miles, car_location, car_sold, car_id, car_image)
values("Honda", "Acty", 6548.99, "1989", "123573", "Galway", 0, 2,
"https://japanesenostalgiccar.com/wordpress/wp-content/uploads/2022/08/Honda-Acty-4WD-Attack-1988.jpg");
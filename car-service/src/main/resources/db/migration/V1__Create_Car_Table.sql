CREATE TABLE "cars" (
    id SERIAL PRIMARY KEY,
    make VARCHAR(255) ,
    model VARCHAR(255) , 
    year INT, 
    price DECIMAL(10, 2), 
    engine_type VARCHAR(255)
);
-- This file is used to initialize the tables for the project Tire
DROP TABLE IF EXISTS brands;

CREATE TABLE brands (
    id CHAR(4),
    -- id, format : xxdd
    -- xx rules :  10 : Premium | 20 : Mid-range | 30,40,50 : Economy | 60,70,80,90 : Budget
    brand VARCHAR(50),
    -- name of maker, such as Michelin
    grade SMALLINT DEFAULT 1,
    -- 1: Premium Tyres, 2: Mid-range Tyres, 3: Economy Tyres, 4: Budget Tyres
    introduction JSON DEFAULT '{}',
    -- introduction of the brand
    c_at TIMESTAMP DEFAULT now()
);


-- DROP TABLE IF EXISTS tires;

-- CREATE TABLE tires (
--     id CHAR(21),
--     -- generate id by nanoid
--     brand VARCHAR(30),
--     -- name of maker, such as Michelin
--     model VARCHAR(255),
--     -- 
--     c_at TIMESTAMP DEFAULT now()
-- );
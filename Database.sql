-- Database: Cijferregistratie

-- 1. Maak de tabel voor docenten
CREATE TABLE docenten (
    docent_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    wachtwoord_hash VARCHAR(255) NOT NULL
);

-- 2. Maak de tabel voor leerlingen
CREATE TABLE leerlingen (
    leerling_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(100) NOT NULL,
    klas_id INT NOT NULL, -- Verwijzing naar de klas
    email VARCHAR(150) NOT NULL UNIQUE,
    wachtwoord_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (klas_id) REFERENCES klassen(klas_id)
);

-- 3. Maak de tabel voor klassen
CREATE TABLE klassen (
    klas_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(50) NOT NULL
);

-- 4. Maak de tabel voor vakken
CREATE TABLE vakken (
    vak_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(100) NOT NULL,
    docent_id INT NOT NULL, -- Verwijzing naar de docent
    FOREIGN KEY (docent_id) REFERENCES docenten(docent_id)
);

-- 5. Maak de tabel voor blokken
CREATE TABLE blokken (
    blok_id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(50) NOT NULL,
    startdatum DATE NOT NULL,
    einddatum DATE NOT NULL
);

-- 6. Maak de tabel voor cijfers
CREATE TABLE cijfers (
    cijfer_id INT AUTO_INCREMENT PRIMARY KEY,
    leerling_id INT NOT NULL, -- Verwijzing naar de leerling
    vak_id INT NOT NULL, -- Verwijzing naar het vak
    blok_id INT NOT NULL, -- Verwijzing naar het blok
    cijfer DECIMAL(5, 2) NOT NULL, -- Cijfers met max. 2 decimalen
    invoer_datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    docent_id INT NOT NULL, -- Wie het cijfer heeft ingevoerd
    FOREIGN KEY (leerling_id) REFERENCES leerlingen(leerling_id),
    FOREIGN KEY (vak_id) REFERENCES vakken(vak_id),
    FOREIGN KEY (blok_id) REFERENCES blokken(blok_id),
    FOREIGN KEY (docent_id) REFERENCES docenten(docent_id)
);

-- 7. Maak een tabel voor logging/historiek van cijferinvoer
CREATE TABLE cijfer_historiek (
    historiek_id INT AUTO_INCREMENT PRIMARY KEY,
    cijfer_id INT NOT NULL, -- Verwijzing naar de originele cijfer
    oude_waarde DECIMAL(5, 2),
    nieuwe_waarde DECIMAL(5, 2),
    wijziging_datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gewijzigd_door INT NOT NULL, -- Docent die wijziging heeft gedaan
    FOREIGN KEY (cijfer_id) REFERENCES cijfers(cijfer_id),
    FOREIGN KEY (gewijzigd_door) REFERENCES docenten(docent_id)
);

-- 8. Vul enkele standaardgegevens in voor testing
-- Klassen
INSERT INTO klassen (naam) VALUES ('MAVO 4'), ('HAVO 5'), ('VWO 6');

-- Docenten
INSERT INTO docenten (naam, email, wachtwoord_hash) 
VALUES 
('Jan de Vries', 'jan.devries@veenhoop.nl', 'hash1'),
('Maria Jansen', 'maria.jansen@veenhoop.nl', 'hash2');

-- Vakken
INSERT INTO vakken (naam, docent_id) 
VALUES 
('Wiskunde', 1), 
('Nederlands', 2);

-- Blokken
INSERT INTO blokken (naam, startdatum, einddatum) 
VALUES 
('Blok 1', '2024-01-01', '2024-03-31'), 
('Blok 2', '2024-04-01', '2024-06-30');

-- Leerlingen
INSERT INTO leerlingen (naam, klas_id, email, wachtwoord_hash) 
VALUES 
('Pieter Janssen', 1, 'pieter.janssen@veenhoop.nl', 'hash3'),
('Anna Bakker', 2, 'anna.bakker@veenhoop.nl', 'hash4');

-- Cijfers
INSERT INTO cijfers (leerling_id, vak_id, blok_id, cijfer, docent_id) 
VALUES 
(1, 1, 1, 8.5, 1), 
(2, 2, 1, 7.0, 2);

CREATE TABLE IF NOT EXISTS player (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    club VARCHAR(255) NULL,
    nation VARCHAR(255) NOT NULL,
    position ENUM('GK','RB','CB','LB','CDM','CM','CAM','RM','LM','RW','LW','ST') NOT NULL,
    pace INT NOT NULL CHECK (pace BETWEEN 0 AND 100),
    shooting INT NOT NULL CHECK (shooting BETWEEN 0 AND 100),
    passing INT NOT NULL CHECK (passing BETWEEN 0 AND 100),
    dribbling INT NOT NULL CHECK (dribbling BETWEEN 0 AND 100),
    defending INT NOT NULL CHECK (defending BETWEEN 0 AND 100),
    physical INT NOT NULL CHECK (physical BETWEEN 0 AND 100),
    overall INT NOT NULL CHECK (overall BETWEEN 0 AND 100),

    PRIMARY KEY(id)
);

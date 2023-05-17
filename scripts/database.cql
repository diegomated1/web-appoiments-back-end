
CREATE KEYSPACE appoiments WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

USE appoiments;

CREATE TABLE appoiments.appoiments_by_id (
    id_appoiment text,
    date timestamp,
    client_address text,
    client_birthday timestamp,
    client_id text,
    client_name text,
    client_second_name text,
    description text,
    place text,
    premium boolean,
    status int,
    type text,
    PRIMARY KEY (id_appoiment, date)
);

CREATE TABLE appoiments.appoiments_by_status (
    id_appoiment text,
    date timestamp,
    client_address text,
    client_birthday timestamp,
    client_id text,
    client_name text,
    client_second_name text,
    description text,
    place text,
    premium boolean,
    status int,
    type text,
    PRIMARY KEY (status, date, id_appoiment)
);

CREATE TABLE appoiments.appoiments_by_client (
    id_appoiment text,
    date timestamp,
    client_address text,
    client_birthday timestamp,
    client_id text,
    client_name text,
    client_second_name text,
    description text,
    place text,
    premium boolean,
    status int,
    type text,
    PRIMARY KEY (client_id, date, id_appoiment)
);

CREATE TABLE appoiments.tickets_by_id (
    id_ticket text PRIMARY KEY,
    date timestamp,
    id_appoiment text,
    priority int
);

CREATE TABLE appoiments.tickets_by_priority (
    priority int,
    date timestamp,
    id_appoiment text,
    id_ticket text,
    PRIMARY KEY (priority, date, id_appoiment)
);

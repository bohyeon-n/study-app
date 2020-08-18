DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user;


CREATE TABLE user
(
    id       bigint primary key auto_increment,
    email    varchar(512),
    username varchar(512),
    profile_url varchar(512)
);

CREATE TABLE post
(
    id         bigint primary key auto_increment,
    title      varchar(512),
    location      varchar(128),
    category   varchar(128),
    created_time datetime,
    content    text,
    view_count bigint,
    author_id    bigint references user (id)
);

CREATE TABLE comment
(
    id bigint primary key auto_increment,
    content text,
    post_id bigint references post(id),
    author_id bigint references user(id),
    created_time datetime
)

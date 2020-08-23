INSERT INTO user (id, email, username)
VALUES (10, 'test@mail.com', 'bohyeon');

INSERT INTO post ( title, location, category, content, view_count, author_id, created_time)
VALUES ( '자바스터디 모집', '서울', '언어', '스터디 모집합니다', 1, 10, NOW());

INSERT INTO comment ( content, post_id, author_id, created_time)
VALUES ( 'comment1', 1, 10, NOW());

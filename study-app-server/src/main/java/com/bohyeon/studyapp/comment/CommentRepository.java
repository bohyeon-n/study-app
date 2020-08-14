package com.bohyeon.studyapp.comment;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CommentRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public CommentRepository(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<Comment> findByPostId(Long id) {
        String query = "SELECT id, content, author_id, created_time FROM comment WHERE post_id = :id ORDER BY created_time DESC";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        return namedParameterJdbcTemplate.query(query, parameter, BeanPropertyRowMapper.newInstance(Comment.class));
    }

    public Long add(CommentRequest commentRequest, Long userId) {
        String sql = "INSERT INTO comment (post_id, author_id, content, created_time) VALUES (:postId, :authorId, :content, :createdTime)";
        SqlParameterSource parameter = new MapSqlParameterSource("postId", commentRequest.getPostId())
                .addValue("authorId", userId)
                .addValue("content", commentRequest.getContent())
                .addValue("createdTime", LocalDateTime.now());

        KeyHolder keyHolder = new GeneratedKeyHolder();

        namedParameterJdbcTemplate.update(sql, parameter, keyHolder);
        return keyHolder.getKey().longValue();

    }

    public void deleteByPostId(Long postId) {
        String sql = "DELETE FROM comment WHERE comment.post_id = :postId";
        SqlParameterSource parameter = new MapSqlParameterSource("postId", postId);

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public Comment findById(Long newCommentId) {
        String query = "SELECT id, content, author_id , created_time FROM comment WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", newCommentId);

        return namedParameterJdbcTemplate.queryForObject(query, parameter, BeanPropertyRowMapper.newInstance(Comment.class));
    }

    public void update(Long id, CommentRequest commentRequest) {
        String sql = "UPDATE comment SET content = :content WHERE comment.id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id)
                .addValue("content", commentRequest.getContent());

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public void delete(Long id) {
        String sql = "DELETE FROM comment WHERE comment.id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public List<Comment> findByUserId(Long id) {
        String query = "SELECT c.id, c.content, c.author_id, c.created_time , c.post_id, p.title AS post_title FROM comment c LEFT JOIN post p ON p.id = c.post_id WHERE c.author_id = :authorId ";
        SqlParameterSource parameter = new MapSqlParameterSource("authorId", id);

        return namedParameterJdbcTemplate.query(query, parameter, BeanPropertyRowMapper.newInstance(Comment.class));
    }
}

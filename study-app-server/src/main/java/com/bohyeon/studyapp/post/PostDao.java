package com.bohyeon.studyapp.post;

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
public class PostDao {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public PostDao(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<PostResponseDto> findAll() {
        String sql = "SELECT p.id, p.title, p.content, p.created_time, p.category, p.location as location, p.view_count, p.author_id, COUNT(c.id) AS comment_count FROM post p LEFT JOIN comment c ON p.id = c.post_id GROUP BY p.id";
        return namedParameterJdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(PostResponseDto.class));
    }

    public PostDetailResponse findById(Long id) {
        String sql = "SELECT p.id, p.title, p.content, p.created_time, p.category, p.location as location, p.view_count, p.author_id FROM post p WHERE p.id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        return namedParameterJdbcTemplate.queryForObject(sql, parameter, BeanPropertyRowMapper.newInstance(PostDetailResponse.class));
    }

    public Long addPost(PostRequestDto requestBody, Long userId) {
        LocalDateTime localDateTime = LocalDateTime.now();

        String sql = "INSERT INTO post (title, location , category, created_time, content, author_id, view_count) VALUES (:title, :location, :category, :time,  :content, :authorId, 0)";
        SqlParameterSource parameter = new MapSqlParameterSource("title", requestBody.getTitle())
                .addValue("location", requestBody.getLocation())
                .addValue("category", requestBody.getCategory())
                .addValue("content", requestBody.getContent())
                .addValue("authorId", userId)
                .addValue("time", localDateTime);

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, parameter, keyHolder);

        return keyHolder.getKey().longValue();
    }

    public void deletePost(Long id) {
        String sql = "DELETE FROM post WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public void increaseViewCount(Long id) {
        String sql = "UPDATE post SET view_count = view_count + 1 WHERE post.id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public void updatePost(Long id, PostRequestDto postRequestDto) {
        String sql = "UPDATE post SET title = :title, category = :category, location = :location, content = :content WHERE post.id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("title", postRequestDto.getTitle())
                .addValue("category", postRequestDto.getCategory())
                .addValue("location", postRequestDto.getLocation())
                .addValue("content", postRequestDto.getContent())
                .addValue("id", id);

        namedParameterJdbcTemplate.update(sql, parameter);
    }

    public List<PostResponseDto> findByUserId(Long id) {
        String sql = "SELECT p.id, p.title, p.content, p.created_time, p.category, p.location as location, p.view_count, p.author_id, " +
                "COUNT(c.id) AS comment_count FROM post p LEFT JOIN comment c ON p.id = c.post_id WHERE p.author_id = :authorId GROUP BY p.id";
        SqlParameterSource parameter = new MapSqlParameterSource("authorId", id);

        return namedParameterJdbcTemplate.query(sql, parameter, BeanPropertyRowMapper.newInstance(PostResponseDto.class));
    }

    public List<PostResponseDto> findByTitleWorld(String query) {
        String word = "%" + query + "%";
        String wordFirstOrder = query;
        String wordSecondOrder = query + "%";
        String wordThirdOrder = "%" + query;

        String sql = "SELECT p.id, p.title, p.content, p.created_time, p.category, p.location as location, p.view_count, p.author_id, " +
                "COUNT(c.id) AS comment_count FROM post p LEFT JOIN comment c ON p.id = c.post_id WHERE p.title LIKE :word GROUP BY p.id " +
                "ORDER BY CASE " +
                "WHEN p.title LIKE :first THEN 1 " +
                "WHEN p.title LIKE :second  THEN 2 " +
                "WHEN p.title LIKE :third THEN 3 " +
                "ELSE 4 END ";

        SqlParameterSource parameter = new MapSqlParameterSource("word", word)
                .addValue("first", wordFirstOrder)
                .addValue("second", wordSecondOrder)
                .addValue("third", wordThirdOrder);

        return namedParameterJdbcTemplate.query(sql, parameter, BeanPropertyRowMapper.newInstance(PostResponseDto.class));
    }

    public List<PostResponseDto> findPaginated(int pageNo, int pageSize) {
        int offset = (pageNo - 1) * pageSize;

        String sql = "SELECT p.id, p.title, p.content, p.created_time, p.category, p.location as location, p.view_count, p.author_id, COUNT(c.id) AS comment_count " +
                "FROM post p  LEFT JOIN comment c ON p.id = c.post_id GROUP BY p.id ORDER BY p.created_time DESC LIMIT :pageSize OFFSET :offset";
        SqlParameterSource parameter = new MapSqlParameterSource("pageSize", pageSize)
                .addValue("offset", offset);

        return namedParameterJdbcTemplate.query(sql, parameter, BeanPropertyRowMapper.newInstance(PostResponseDto.class));
    }

    public Integer findPostCount() {
        String sql = "SELECT COUNT(*) from post";

        return namedParameterJdbcTemplate.getJdbcTemplate().queryForObject(sql, Integer.class);
    }

    public Long findAuthorIdByPostId(Long postId) {
        String sql = "SELECT p.author_id FROM post WHERE post.id = :postId";
        SqlParameterSource parameter = new MapSqlParameterSource("postId", postId);
        return namedParameterJdbcTemplate.queryForObject(sql, parameter, BeanPropertyRowMapper.newInstance(Long.class));
    }
}

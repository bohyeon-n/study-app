package com.bohyeon.studyapp.login;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Optional;

@Repository
public class LoginRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public LoginRepository(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public void save(GithubUser user) {
        String sql = "INSERT INTO user (username, profile_url) VALUES (:username, :profileUrl)";
        SqlParameterSource sqlParameterSource = new MapSqlParameterSource("username", user.getUsername())
                .addValue("profileUrl", user.getProfileUrl());

        namedParameterJdbcTemplate.update(sql, sqlParameterSource);
    }

    public Optional<UserResponse> findByUsername(String username) {
        String sql = "SELECT id, username, profile_url FROM user WHERE username = ?";

        try {
            UserResponse userResponse = namedParameterJdbcTemplate.getJdbcTemplate().queryForObject(sql, new Object[]{username}, BeanPropertyRowMapper.newInstance(UserResponse.class));
            return Optional.of(userResponse);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}

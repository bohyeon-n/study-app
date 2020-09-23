package com.bohyeon.studyapp.file;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Optional;

@Repository
public class ImageRepository {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public ImageRepository(DataSource dataSource) {
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    public Optional<Image> findByName(String name) {
        String sql = "SELECT id, name, type, pic_byte FROM image WHERE name = :name";
        SqlParameterSource parameter = new MapSqlParameterSource("name", name);
        try {
            Image image = namedParameterJdbcTemplate.queryForObject(sql, parameter, BeanPropertyRowMapper.newInstance(Image.class));
            assert image != null;
            return Optional.of(image);

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Image> findById(Long id) {
        String sql = "SELECT id, name, type, pic_byte FROM image WHERE id = :id";
        SqlParameterSource parameter = new MapSqlParameterSource("id", id);
        try {
            Image image = namedParameterJdbcTemplate.queryForObject(sql, parameter, BeanPropertyRowMapper.newInstance(Image.class));
            assert image != null;
            return Optional.of(image);

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Long addImage(Image image) {
        String sql = "INSERT INTO image (name, type, pic_byte) VALUES ( :name, :type, :picByte )";
        SqlParameterSource parameter = new MapSqlParameterSource("name", image.getName())
                .addValue("type", image.getType())
                .addValue("picByte", image.getPicByte());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, parameter, keyHolder);
        return keyHolder.getKey().longValue();
    }
}

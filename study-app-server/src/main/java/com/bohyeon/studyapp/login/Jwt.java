package com.bohyeon.studyapp.login;


import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class Jwt {

    private SecretKey key;

    public Jwt(String secretKey) {
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateJwt(String value) {
        return Jwts.builder().setId(value).signWith(key).compact();
    }

    public String parseIdFromJwt(String jws) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jws).getBody().getId();
        } catch (JwtException e) {
            return null;
        }
    }
}

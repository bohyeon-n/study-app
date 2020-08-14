package com.bohyeon.studyapp.user;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserCrudRepository extends CrudRepository<User, Long> {

    Optional<User> findById(Long id);
}

package com.paliup.starter.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.paliup.starter.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}

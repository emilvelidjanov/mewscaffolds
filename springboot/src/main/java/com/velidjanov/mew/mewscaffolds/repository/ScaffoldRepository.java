package com.velidjanov.mew.mewscaffolds.repository;

import com.velidjanov.mew.mewscaffolds.entity.Scaffold;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScaffoldRepository extends JpaRepository<Scaffold, Long> {
}

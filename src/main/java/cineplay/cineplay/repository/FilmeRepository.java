package cineplay.cineplay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cineplay.cineplay.entity.Filme;

@Repository
public interface FilmeRepository extends JpaRepository<Filme, Integer>{
    public Optional<Filme> findByNome(String nome);
}
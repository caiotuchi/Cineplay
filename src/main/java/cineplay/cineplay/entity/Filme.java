package cineplay.cineplay.entity;
import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="filmes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Filme{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String nome;
    String sinopse;
    Integer classificacao;
    @Column(name="data_estreia", nullable=false)
    LocalDate dataEstreia;


}
package cineplay.cineplay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cineplay.cineplay.entity.Filme;
import cineplay.cineplay.services.FilmeService;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/filmes")
public class FilmeController{
    private FilmeService filmeService;

    @Autowired
    public FilmeController(FilmeService filmeService){
        this.filmeService = filmeService;
    }

    @PostMapping
    @Transactional
    public void cadastrarFilme(@RequestBody Filme filme){
        filmeService.cadastrarFilme(filme);
    }

    @GetMapping("/{nome}")
    public Filme buscarFilmePorNome(@PathVariable String nome){
        return filmeService.buscarFilmePorNome(nome).get();
    }

    @GetMapping
    public List<Filme> listarFilmes(){
        return filmeService.listarFilmes();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void removerFilme(@PathVariable Integer id){
        filmeService.removerFilme(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public void editarFilme(@PathVariable Integer id,@RequestBody Filme filme){
        filmeService.editarFilme(id, filme);
    }



}
package cineplay.cineplay.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cineplay.cineplay.entity.Filme;
import cineplay.cineplay.repository.FilmeRepository;

@Service
public class FilmeService {
    private FilmeRepository repository;

    @Autowired
    public FilmeService(FilmeRepository repository){
        this.repository = repository;
    }

    public Filme cadastrarFilme(Filme filme){
        return repository.save(filme);
    }
    
    public Optional<Filme> buscarFilmePorNome(String nome){
        Optional<Filme> optional = repository.findByNome(nome);
        if(optional.isPresent()){
            return optional;
        }
        throw new RuntimeException();
        
    }

    public List<Filme> listarFilmes(){
        return repository.findAll();
    }

    public Filme editarFilme(Integer id, Filme filme){
        repository.findById(id);
        Optional<Filme> optional = repository.findById(id);

        if(optional.isPresent()){
            Filme filmeParaAtualizar = optional.get();
            if(filme.getNome() != null){
                filmeParaAtualizar.setNome(filme.getNome());
            }
            if(filme.getSinopse() != null){
                filmeParaAtualizar.setSinopse(filme.getSinopse());
            }
            if(filme.getClassificacao() != null){
                filmeParaAtualizar.setClassificacao(filme.getClassificacao());
            }
            if(filme.getDataEstreia() != null){
                filmeParaAtualizar.setDataEstreia(filme.getDataEstreia());
            }

            return repository.save(filmeParaAtualizar);
        } else {
            throw new RuntimeException("O filme não foi cadastrado");
        }

    }

    public void removerFilme(Integer id){
        repository.findById(id);
        Optional<Filme> optional = repository.findById(id);
        if(optional.isPresent()){
            repository.delete(optional.get());
        } else {
            throw new RuntimeException("O filme não foi cadastrado");
        }
    }


}

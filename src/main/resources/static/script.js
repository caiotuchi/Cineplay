function carregarFilmes() {

  fetch('/filmes')
    .then(response => response.json())
    .then(data => exibirFilmes(data))

}

async function cadastrarFilme(event) {

  //pega os valores do form
  var nome = document.getElementById('nome').value;
  var sinopse = document.getElementById('sinopse').value;
  var classificacao = document.getElementById('classificacao').value;
  var dataEstreia = document.getElementById('dataEstreia').value;

  //cria o filme
  var filme = {
    nome: nome,
    sinopse: sinopse,
    classificacao: parseInt(classificacao),
    dataEstreia: dataEstreia
  };

  //manda o filme para o back
  await fetch('/filmes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filme)
  })
    .then(response => {
      if (response.ok) {
        //adiciona o novo filme na lista de filmes
        var listaFilmes = document.getElementById('lista-filmes');

        var filmeItem = document.createElement('div');
        filmeItem.classList.add('filme-item');

        var nomeElement = document.createElement('h2');
        nomeElement.textContent = 'Filme: ' + filme.nome;

        var sinopseElement = document.createElement('p');
        sinopseElement.textContent = 'Sinopse: ' + filme.sinopse;

        var classificacaoElement = document.createElement('p');
        classificacaoElement.textContent = 'Classificação: ' + filme.classificacao;

        var dataEstreiaElement = document.createElement('p');
        dataEstreiaElement.textContent = 'Data de Estreia: ' + filme.dataEstreia;

        filmeItem.appendChild(nomeElement);
        filmeItem.appendChild(sinopseElement);
        filmeItem.appendChild(classificacaoElement);
        filmeItem.appendChild(dataEstreiaElement);

        listaFilmes.appendChild(filmeItem);

        //limpa o form
        document.getElementById('nome').value = '';
        document.getElementById('sinopse').value = '';
        document.getElementById('classificacao').value = '';
        document.getElementById('dataEstreia').value = '';

      }
    })
  carregarFilmes();
}

document.getElementById('form-filme').addEventListener('submit', cadastrarFilme);




function exibirFilmes(filmes) {
  var listaFilmes = document.getElementById('lista-filmes');
  listaFilmes.innerHTML = '';

  var table = document.createElement('table');
  table.classList.add('filmes-table');


  var thead = document.createElement('thead');
  var headerLinha = document.createElement('tr');
  var headers = ['Filme', 'Sinopse', 'Classificacao', 'Data de Estreia', 'Acoes'];

  headers.forEach(header => {
    var th = document.createElement('th');
    th.textContent = header;
    headerLinha.appendChild(th);
  });

  thead.appendChild(headerLinha);
  table.appendChild(thead);


  var tbody = document.createElement('tbody');

  filmes.forEach(filme => {
    var filmeLinha = document.createElement('tr');

    var nome = document.createElement('td');
    nome.textContent = filme.nome;

    var sinopse = document.createElement('td');
    sinopse.textContent = filme.sinopse;

    var classificacao = document.createElement('td');
    classificacao.textContent = filme.classificacao;

    var dataEstreia = document.createElement('td');
    dataEstreia.textContent = filme.dataEstreia;


    //ações
    var acoes = document.createElement('td');
    var botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.addEventListener('click', function () {
      editarFilme(filme);
    });

    acoes.appendChild(botaoEditar);

    var botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.addEventListener('click', function () {
      removerFilme(filme.id);
    });

    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoRemover);

    filmeLinha.appendChild(nome);
    filmeLinha.appendChild(sinopse);
    filmeLinha.appendChild(classificacao);
    filmeLinha.appendChild(dataEstreia);
    filmeLinha.appendChild(acoes);

    tbody.appendChild(filmeLinha);
  });

  table.appendChild(tbody);
  listaFilmes.appendChild(table);
}

document.addEventListener('DOMContentLoaded', carregarFilmes);



async function removerFilme(id) {
  await fetch('/filmes/' + id, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        carregarFilmes();
      }
    })
}




function editarFilme(filme) {
  Swal.fire({
    title: 'Editar Filme',
    html: `
      <label for="nome-edicao">Nome:</label>
      <input type="text" id="nome-edicao" value="${filme.nome}" class="swal2-input">
      <label for="sinopse-edicao">Sinopse:</label>
      <input type="text" id="sinopse-edicao" value="${filme.sinopse}" class="swal2-input">
      <label for="classificacao-edicao">Classificacao:</label>
      <input type="text" id="classificacao-edicao" value="${filme.classificacao}" class="swal2-input">
      <label for="dataEstreia-edicao">Data de Estreia:</label>
      <input type="text" id="dataEstreia-edicao" value="${filme.dataEstreia}" class="swal2-input">
    `,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    showConfirmButton: true,
    confirmButtonText: 'Salvar',
    preConfirm: () => {
      var nome = document.getElementById('nome-edicao').value;
      var sinopse = document.getElementById('sinopse-edicao').value;
      var classificacao = document.getElementById('classificacao-edicao').value;
      var dataEstreia = document.getElementById('dataEstreia-edicao').value;

      var filmeEditado = {
        id: filme.id,
        nome: nome,
        sinopse: sinopse,
        classificacao: parseInt(classificacao),
        dataEstreia: dataEstreia
      };

      fetch(`/filmes/${filme.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmeEditado)
      })
        .then(response => {
          if (response.ok) {
            Swal.fire({
              title: 'Sucesso',
              text: 'Filme editado com sucesso!',
              icon: 'success'
            });
            carregarFilmes();
          }
        })

    }
  });
}
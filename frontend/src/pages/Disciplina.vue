<script setup>
import Menu from '../components/Menu.vue';
import { ref, onMounted } from 'vue';
import * as disciplinaService from '../services/disciplinaService';

const disciplina = ref([]);
const carregando = ref(false);

let carregardisciplina = async function () {

    carregando.value = true;

    try {

        disciplina.value = await disciplinaService.listar();

    } catch (erro) {

        console.error("Erro ao carregar disciplina:", erro);
        alert("Não foi possível carregar os disciplina.");

    } finally {

        carregando.value = false;

    }

};

onMounted(() => {
    carregarCursos();
});
</script>
<template>
  <div class="app">

    <main class="main">
      
      <section class="content">
        <div class="page-intro">
          <div>
            <h2>Lista de disciplinas</h2>
            <p>Gerencie as disciplinas vinculadas aos cursos.</p>
          </div><a class="button button-primary" href="#modal-cadastro"><span class="plus">+</span>Novo disciplina</a>
        </div>
        <div class="summary-row">
          <div class="summary-card">
            <div class="summary-icon">▤</div>
            <div><span>Disciplinas cadastradas</span><strong>{{disciplina.length}}</strong></div>
          </div>
          <div class="summary-note"><span class="status-dot"></span>Dados fictícios para demonstração</div>
        </div>
        <div class="table-card">
          <div class="table-toolbar">
            <div><strong>Todos os registros</strong><span>Consulte e gerencie disciplinas</span></div>
            <div class="search-box">⌕ &nbsp; Busca visual (não funcional)</div>
          </div>
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                <th>ID</th>
                <th>Curso</th>
                <th>Carga horária</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="person-cell">
                      <div class="person-avatar">PI</div>
                      <div><span class="person-name">Programação para Internet</span><span class="person-sub">ID
                          #001</span></div>
                    </div>
                  </td>
                  <td>PI-102</td>
                  <td>Técnico em Informática</td>
                  <td>80 h</td>
                  <td>
                    <div class="actions">
                      <a class="action-button" href="#modal-editar" title="Editar" aria-label="Editar">✎</a>
                      <a class="action-button delete" href="#modal-remover-1" title="Remover" aria-label="Remover">⌫</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="person-cell">
                      <div class="person-avatar">BD</div>
                      <div><span class="person-name">Banco de Dados</span><span class="person-sub">ID #002</span></div>
                    </div>
                  </td>
                  <td>BD-201</td>
                  <td>Técnico em Informática</td>
                  <td>60 h</td>
                  <td>
                    <div class="actions">
                      <a class="action-button" href="#modal-editar" title="Editar" aria-label="Editar">✎</a>
                      <a class="action-button delete" href="#modal-remover-2" title="Remover" aria-label="Remover">⌫</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="person-cell">
                      <div class="person-avatar">FA</div>
                      <div><span class="person-name">Fundamentos de Alimentos</span><span class="person-sub">ID
                          #003</span></div>
                    </div>
                  </td>
                  <td>FA-110</td>
                  <td>Técnico em Alimentos</td>
                  <td>40 h</td>
                  <td>
                    <div class="actions">
                      <a class="action-button" href="#modal-editar" title="Editar" aria-label="Editar">✎</a>
                      <a class="action-button delete" href="#modal-remover-3" title="Remover" aria-label="Remover">⌫</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="person-cell">
                      <div class="person-avatar">ES</div>
                      <div><span class="person-name">Engenharia de Software</span><span class="person-sub">ID
                          #004</span></div>
                    </div>
                  </td>
                  <td>ES-301</td>
                  <td>Análise e Desenvolvimento de Sistemas</td>
                  <td>80 h</td>
                  <td>
                    <div class="actions">
                      <a class="action-button" href="#modal-editar" title="Editar" aria-label="Editar">✎</a>
                      <a class="action-button delete" href="#modal-remover-4" title="Remover" aria-label="Remover">⌫</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-footer"><span>Exibindo 4 registros</span><span>Protótipo estático para atividade
              didática</span></div>
        </div>
      </section>
    </main>
  </div>

  <section class="modal" id="modal-cadastro">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">NOVO CADASTRO</span>
          <h2>Novo disciplina</h2>
          <p>Preencha os campos abaixo para adicionar um registro.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <form>
        <div class="form-fields">
          <div class="field full"><label for="campo0">Nome da disciplina</label><input id="campo0" type="text"
              placeholder="Ex.: Programação para Internet"></div>
          <div class="field"><label for="campo1">Código</label><input id="campo1" type="text" placeholder="Ex.: PI-102">
          </div>
          <div class="field"><label for="campo2">Curso</label><select id="campo2" name="campo2">
              <option>Selecione...</option>
              <option>Técnico em Informática</option>
              <option>Técnico em Alimentos</option>
              <option>Análise e Desenvolvimento de Sistemas</option>
            </select></div>
          <div class="field"><label for="campo3">Carga horária (h)</label><input id="campo3" type="number"
              placeholder="Ex.: 80"></div>
        </div>
        <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><button
            class="button button-primary" type="button">Salvar cadastro</button></div>
        <p class="modal-note">Modal demonstrativo: o formulário não salva dados sem JavaScript.</p>
      </form>
    </div>
  </section>

  <section class="modal" id="modal-editar">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">EDITAR REGISTRO</span>
          <h2>Editar disciplina</h2>
          <p>Exemplo visual de formulário de edição.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <form>
        <div class="form-fields">
          <div class="field full"><label for="campo0">Nome da disciplina</label><input id="campo0" type="text"
              placeholder="Ex.: Programação para Internet"></div>
          <div class="field"><label for="campo1">Código</label><input id="campo1" type="text" placeholder="Ex.: PI-102">
          </div>
          <div class="field"><label for="campo2">Curso</label><select id="campo2" name="campo2">
              <option>Selecione...</option>
              <option>Técnico em Informática</option>
              <option>Técnico em Alimentos</option>
              <option>Análise e Desenvolvimento de Sistemas</option>
            </select></div>
          <div class="field"><label for="campo3">Carga horária (h)</label><input id="campo3" type="number"
              placeholder="Ex.: 80"></div>
        </div>
        <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><button
            class="button button-primary" type="button">Salvar alterações</button></div>
        <p class="modal-note">Sem JavaScript, os campos não são preenchidos automaticamente.</p>
      </form>
    </div>
  </section>

  <section class="modal" id="modal-remover-1">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">REMOVER REGISTRO</span>
          <h2>Confirmar remoção</h2>
          <p>Esta é uma demonstração visual. A remoção não altera os dados estáticos.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a class="button button-danger"
          href="#">Confirmar remoção</a></div>
    </div>
  </section>
  <section class="modal" id="modal-remover-2">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">REMOVER REGISTRO</span>
          <h2>Confirmar remoção</h2>
          <p>Esta é uma demonstração visual. A remoção não altera os dados estáticos.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a class="button button-danger"
          href="#">Confirmar remoção</a></div>
    </div>
  </section>
  <section class="modal" id="modal-remover-3">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">REMOVER REGISTRO</span>
          <h2>Confirmar remoção</h2>
          <p>Esta é uma demonstração visual. A remoção não altera os dados estáticos.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a class="button button-danger"
          href="#">Confirmar remoção</a></div>
    </div>
  </section>
  <section class="modal" id="modal-remover-4">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">REMOVER REGISTRO</span>
          <h2>Confirmar remoção</h2>
          <p>Esta é uma demonstração visual. A remoção não altera os dados estáticos.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a class="button button-danger"
          href="#">Confirmar remoção</a></div>
    </div>
  </section>
</template>
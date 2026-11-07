<script setup>
import Menu from '../components/Menu.vue';
import { ref, onMounted } from 'vue';
import * as cursoService from '../services/cursoService';

const cursos = ref([]);
const carregando = ref(false);

let carregarCursos = async function () {

    carregando.value = true;

    try {

        cursos.value = await cursoService.listar();

    } catch (erro) {

        console.error("Erro ao carregar cursos:", erro);
        alert("Não foi possível carregar os cursos.");

    } finally {

        carregando.value = false;

    }

};

onMounted(() => {
    carregarCursos();
});
</script>

<template>

  <main class="main">
    
    <section class="content">
      <div class="page-intro">
        <div>
          <h2>Lista de cursos</h2>
          <p>Gerencie os cursos ofertados pela instituição.</p>
        </div><a class="button button-primary" href="#modal-cadastro"><span class="plus">+</span>Novo curso</a>
      </div>
      <div class="summary-row">
        <div class="summary-card">
          <div class="summary-icon">▤</div>
          <div><span>Cursos cadastrados</span><strong>{{ cursos.length }}</strong></div>
        </div>
        <div class="summary-note"><span class="status-dot"></span>Dados fictícios para demonstração</div>
      </div>
      <div class="table-card">
        <div class="table-toolbar">
          <div><strong>Todos os registros</strong><span>Consulte e gerencie cursos</span></div>
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

              <tr v-if="carregando">
                <td colspan="4">Carregando cursos...</td>
              </tr>

              <tr v-else-if="cursos.length === 0">
                <td colspan="4">Nenhum curso cadastrado.</td>
              </tr>

              <tr v-for="curso in cursos" :key="curso.id">

                <td>#{{ curso.id }}</td>

                <td>
                  <div class="person-cell">
                    <div class="person-avatar">
                      {{ curso.nome.substring(0, 2).toUpperCase() }}
                    </div>

                    <div>
                      <span class="person-name">
                        {{ curso.nome }}
                      </span>
                    </div>
                  </div>
                </td>

                <td>{{ curso.cargaHoraria }} horas</td>

                <td>
                  <div class="actions">
                    <button class="action-button" title="Editar">
                      ✎
                    </button>

                    <button class="action-button delete" title="Remover">
                      ⌫
                    </button>
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

  <section class="modal" id="modal-cadastro">
    <div class="modal-panel">
      <header class="modal-header">
        <div><span class="eyebrow">NOVO CADASTRO</span>
          <h2>Novo curso</h2>
          <p>Preencha os campos abaixo para adicionar um registro.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <form>
        <div class="form-fields">
          <div class="field full"><label for="campo0">Nome do curso</label><input id="campo0" type="text"
              placeholder="Ex.: Técnico em Informática"></div>
          <div class="field"><label for="campo1">Modalidade</label><select id="campo1" name="campo1">
              <option>Selecione...</option>
              <option>Presencial</option>
              <option>A distância</option>
              <option>Híbrido</option>
            </select></div>
          <div class="field"><label for="campo2">Nível de ensino</label><select id="campo2" name="campo2">
              <option>Selecione...</option>
              <option>Técnico integrado</option>
              <option>Técnico subsequente</option>
              <option>Graduação</option>
              <option>Pós-graduação</option>
            </select></div>
          <div class="field"><label for="campo3">Status</label><select id="campo3" name="campo3">
              <option>Selecione...</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select></div>
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
          <h2>Editar curso</h2>
          <p>Exemplo visual de formulário de edição.</p>
        </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
      </header>
      <form>
        <div class="form-fields">
          <div class="field full"><label for="campo0">Nome do curso</label><input id="campo0" type="text"
              placeholder="Ex.: Técnico em Informática"></div>
          <div class="field"><label for="campo1">Modalidade</label><select id="campo1" name="campo1">
              <option>Selecione...</option>
              <option>Presencial</option>
              <option>A distância</option>
              <option>Híbrido</option>
            </select></div>
          <div class="field"><label for="campo2">Nível de ensino</label><select id="campo2" name="campo2">
              <option>Selecione...</option>
              <option>Técnico integrado</option>
              <option>Técnico subsequente</option>
              <option>Graduação</option>
              <option>Pós-graduação</option>
            </select></div>
          <div class="field"><label for="campo3">Status</label><select id="campo3" name="campo3">
              <option>Selecione...</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select></div>
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
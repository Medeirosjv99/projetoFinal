<script setup>
import Menu from '../components/Menu.vue';
</script>

<template>

    <body>
        <div class="app">

            <main class="main">

                <section class="content">
                    <div class="page-intro">
                        <div>
                            <h2>Lista de professores</h2>
                            <p>Gerencie os professores cadastrados no sistema.</p>
                        </div><a class="button button-primary" href="#modal-cadastro"><span class="plus">+</span>Novo
                            professor</a>
                    </div>
                    <div class="summary-row">
                        <div class="summary-card">
                            <div class="summary-icon">▤</div>
                            <div><span>Professores cadastrados</span><strong>4</strong></div>
                        </div>
                        <div class="summary-note"><span class="status-dot"></span>Dados fictícios para demonstração
                        </div>
                    </div>
                    <div class="table-card">
                        <div class="table-toolbar">
                            <div><strong>Todos os registros</strong><span>Consulte e gerencie professores</span></div>
                            <div class="search-box">⌕ &nbsp; Busca visual (não funcional)</div>
                        </div>
                        <div class="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Professor</th>
                                        <th>E-mail</th>
                                        <th>Área</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="person-cell">
                                                <div class="person-avatar">AM</div>
                                                <div><span class="person-name">Ana Martins</span><span
                                                        class="person-sub">ID #001</span></div>
                                            </div>
                                        </td>
                                        <td>ana.martins@instituicao.edu.br</td>
                                        <td>Informática</td>
                                        <td><span class="pill ">Ativo</span></td>
                                        <td>
                                            <div class="actions">
                                                <a class="action-button" href="#modal-editar" title="Editar"
                                                    aria-label="Editar">✎</a>
                                                <a class="action-button delete" href="#modal-remover-1" title="Remover"
                                                    aria-label="Remover">⌫</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="person-cell">
                                                <div class="person-avatar">CO</div>
                                                <div><span class="person-name">Carlos Oliveira</span><span
                                                        class="person-sub">ID #002</span></div>
                                            </div>
                                        </td>
                                        <td>carlos.oliveira@instituicao.edu.br</td>
                                        <td>Matemática</td>
                                        <td><span class="pill ">Ativo</span></td>
                                        <td>
                                            <div class="actions">
                                                <a class="action-button" href="#modal-editar" title="Editar"
                                                    aria-label="Editar">✎</a>
                                                <a class="action-button delete" href="#modal-remover-2" title="Remover"
                                                    aria-label="Remover">⌫</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="person-cell">
                                                <div class="person-avatar">MC</div>
                                                <div><span class="person-name">Mariana Costa</span><span
                                                        class="person-sub">ID #003</span></div>
                                            </div>
                                        </td>
                                        <td>mariana.costa@instituicao.edu.br</td>
                                        <td>Linguagens</td>
                                        <td><span class="pill ">Ativo</span></td>
                                        <td>
                                            <div class="actions">
                                                <a class="action-button" href="#modal-editar" title="Editar"
                                                    aria-label="Editar">✎</a>
                                                <a class="action-button delete" href="#modal-remover-3" title="Remover"
                                                    aria-label="Remover">⌫</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="person-cell">
                                                <div class="person-avatar">RS</div>
                                                <div><span class="person-name">Rafael Santos</span><span
                                                        class="person-sub">ID #004</span></div>
                                            </div>
                                        </td>
                                        <td>rafael.santos@instituicao.edu.br</td>
                                        <td>Ciências da Natureza</td>
                                        <td><span class="pill inactive">Inativo</span></td>
                                        <td>
                                            <div class="actions">
                                                <a class="action-button" href="#modal-editar" title="Editar"
                                                    aria-label="Editar">✎</a>
                                                <a class="action-button delete" href="#modal-remover-4" title="Remover"
                                                    aria-label="Remover">⌫</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="table-footer"><span>Exibindo 4 registros</span><span>Protótipo estático para
                                atividade didática</span></div>
                    </div>
                </section>
            </main>
        </div>

        <section class="modal" id="modal-cadastro">
            <div class="modal-panel">
                <header class="modal-header">
                    <div><span class="eyebrow">NOVO CADASTRO</span>
                        <h2>Novo professor</h2>
                        <p>Preencha os campos abaixo para adicionar um registro.</p>
                    </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
                </header>
                <form>
                    <div class="form-fields">
                        <div class="field full"><label for="campo0">Nome completo</label><input id="campo0" type="text"
                                placeholder="Ex.: Ana Martins"></div>
                        <div class="field"><label for="campo1">E-mail institucional</label><input id="campo1"
                                type="email" placeholder="nome@instituicao.edu.br"></div>
                        <div class="field"><label for="campo2">Área de atuação</label><input id="campo2" type="text"
                                placeholder="Ex.: Informática"></div>
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
                        <h2>Editar professor</h2>
                        <p>Exemplo visual de formulário de edição.</p>
                    </div><a class="icon-button" href="#" aria-label="Fechar modal">×</a>
                </header>
                <form>
                    <div class="form-fields">
                        <div class="field full"><label for="campo0">Nome completo</label><input id="campo0" type="text"
                                placeholder="Ex.: Ana Martins"></div>
                        <div class="field"><label for="campo1">E-mail institucional</label><input id="campo1"
                                type="email" placeholder="nome@instituicao.edu.br"></div>
                        <div class="field"><label for="campo2">Área de atuação</label><input id="campo2" type="text"
                                placeholder="Ex.: Informática"></div>
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
                <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a
                        class="button button-danger" href="#">Confirmar remoção</a></div>
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
                <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a
                        class="button button-danger" href="#">Confirmar remoção</a></div>
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
                <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a
                        class="button button-danger" href="#">Confirmar remoção</a></div>
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
                <div class="modal-footer"><a class="button button-secondary" href="#">Cancelar</a><a
                        class="button button-danger" href="#">Confirmar remoção</a></div>
            </div>
        </section>
    </body>
</template>
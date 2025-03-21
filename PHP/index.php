<?php require_once('icone.php') ?>
<?php require_once('header.php') ?>

  <body>
    <header>
      <div class="interface">
        <div class="logo">
          <a href="#">
            <img class="resp"src="./imagens/Captura de tela 2024-08-09 131238.png" alt="logo do meu site" />
          </a>
        </div>
        <!-- logo  -->
        <nav class="menu-desktop">
          <ul>
            <li><a href="#Especialidades">Especialidades</a></li>
            <li><a href="#Sobre">Sobre mim</a></li>
            <li><a href="#Projetos">Projetos</a></li>
          </ul>
        </nav>
        <div class="btn-contato">
          <a href="./Contato/contato.html">
            <button>Contato</button>
          </a>
        </div>
        <!-- btn-button -->
      </div>
      <div class="btn-abrir-menu">
        <i class="bi bi-list-nested" id="btn-menu"></i>
      </div>

      <div class="menu-mobile"id="menu-mobile">
        <div class="btn-fechar">
          <i class="bi bi-x-lg"></i>
        </div>
        <nav>
          <ul>
            <li><a href="#Especialidades">Especialidades</a></li>
            <li><a href="#Sobre">Sobre mim</a></li>
            <li><a href="./Contato/contato.html">Contato</a></li>
          </ul>
        </nav>
      </div>
      <!-- MENU MOBILE -->
       <div class="overley-menu"id="overley-menu"></div>
    </header>
    <!-- interface bem feita -->

    <main>
      <section class="topo-do-site">
        <div class="interface">
          <div class="flex">
            <div class="txt-topo-site">
              <h1>
                <span>Ruan Marcelo Ramacioti Luz</span><br />Desenvolvedor de
                Sistemas.
              </h1>
              <p>
                Fazendo o que eu amo, melhorando não só meu mundo, mas o de TODOS.
              </p>

              <div class="btn-contato">
                <a href="#Contato">
                  <button>Fale comigo</button>
                </a>
              </div>
            </div>
            <!-- txt-topo-site -->

            <div class="img-topo-site">
              <img src="./imagens/Captura de tela 2024-08-12 193405.png" alt="Foto RUAN" />
            </div>
            <!-- img-topo-site -->
          </div>
          <!-- flex -->
        </div>
      </section>
      <!-- topo-do-site -->
      <section id="Especialidades"class="especialidades">
        <div class="interface">
          <a href="./MinhasCertificações/index.html" class="especialidaeslink"rel="noopener noreferrer">
          <h2 class="titulo">MINHAS <span>ESPECIALIDADES.</span></h2>
          <div class="flex">
            <div class="especialidades-box">
              <i class="bi bi-patch-check"></i>
              <h3>Certificações</h3>
              <p>
                Ciber segurança na nuvem,
                <br>
                Desenvolvimento de aplicativos Android
              </p>
              <p class="veja"><span>Veja mais</span></p>
            </div>
          </a>
            <!-- especialidades-box -->
            <div class="especialidades-box">
              <i class="bi bi-person-raised-hand"></i>
              <h3> Full Stack </h3>
              <p>
                Desenvolvedor Full-Stack pelo SENAI de Ribeirão preto
              </p>
            </div>
            <!-- especialidades-box -->
            <div class="especialidades-box">
              <i class="bi bi-terminal"></i>
              <h3>Sistemas Operacionais</h3>
              <p>
                Windows
                <br>
                Linux Mint
                <br>
                Kkali Linux
              </p>
            </div>
            <!-- especialidades-box -->
          </div>
          <!-- flex -->
        </div>
        <!-- interface -->
      </section>
      <!-- especialidades -->

      <section id="Sobre"class="sobre">
        <div class="interface">
          <div class="flex">
            <div class="img-sobre">
              <img src="./imagens/Captura de tela 2024-08-12 193405.png" alt="FOTO RUAN" />
            </div>
            <!-- img-sobre -->
            <div class="txt-sobre">
              <h2>MUITO PRAZER,<span>SOU RUAN MARCELO.</span></h2>
              <p>
                Olá meu nome é Ruan, tenho 17 anos , nasci e cresci em Ribeirão
                Preto, estudo no CENTRO DE ENSINO SESI 346 desde o 1°Ano do fundamental
                1, Atualmente estou cursando o técnico de DS (Desenvolvimento De
                Sistemas) Pelo SENAI, pretendo ser desenvolvedor de software e
                cursar ADS na FATEC de Ribeirão preto.
              </p>
              <p>
              Pretendo Crescer mais e mais na carreira de Desenvolvedor de Software e me comprometo a entregar o melhor de mim.
              </p>
              <div class="btn-social">
                <a
                  href="https://www.instagram.com/ruan.luzzz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><button><i class="bi bi-instagram"></i></button
                ></a>
                <a
                  href="https://github.com/Ruan-Marcelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><button><i class="bi bi-github"></i></button
                ></a>
                <a
                  href="https://www.linkedin.com/in/ruan-marcelo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><button><i class="bi bi-linkedin"></i></button
                ></a>
              </div>
            </div>
            <!-- txt-sobre -->
          </div>
          <!-- flex -->
        </div>
        <!-- interface -->
      </section>
      <!-- SOBRE -->

<section  id="Projetos"class="portifolio">

  <div class="interface Projetos">
    <h2 class="titulo Projetos">Meus <span>Projetos.</span></h2>
    <div class="flex">
      <div class="container">
        <div class="gallery">
          <div class="img-box">
            <h2>Html CSS</h2>
          </div>
          <div class="img-box">
            <h2>JavaScript</h2>
          </div>
          <div class="img-box">
            <h2>C#</h2>
          </div>
          <div class="img-box">
            <a class="img4" href="https://github.com/Ruan-Marcelo" target="_blank"
            rel="noopener noreferrer"> <h2>Veja Mais</h2></a>
          </div>
        </a>
        </div>
      </div>
    </div>
  </div>

    </section>

      <section id="Contato"class="formulario">
        <div class="interface">
          <h2 class="titulo">Fale <span>COMIGO.</span></h2>
          <form method="post" action="https://formsubmit.co/luzruan60@gmail.com">
            <input type="text"name="nome"id=""placeholder="Seu Nome Completo:"required>
            <input type="text"name="email"id=""placeholder="Seu EMAIL:"required>
            <input type="text"name="celular"id=""placeholder="Seu CELULAR:">
            <textarea name="" id=""placeholder="Sua mensagem:"required></textarea>
            <div class="btn-enviar"><input type="submit" value="ENVIAR"></div>

          </form>
        </div>
      </section>
    </main>
    <?php require_once('footer.php') ?>   
  </body>
</html>

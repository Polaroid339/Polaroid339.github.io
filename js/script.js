// Seleciona o elemento com a classe "wrapper" e o armazena na variável `wrapper`
const wrapper = document.querySelector(".wrapper"),
  // Seleciona a imagem da música dentro da área de imagem e a armazena em `musicImg`
  musicImg = wrapper.querySelector(".img-area img"),
  // Seleciona o elemento onde o nome da música é exibido e o armazena em `musicName`
  musicName = wrapper.querySelector(".song-details .name"),
  // Seleciona o elemento onde o artista da música é exibido e o armazena em `musicArtist`
  musicArtist = wrapper.querySelector(".song-details .artist"),
  // Seleciona o botão de play/pause e o armazena em `playPauseBtn`
  playPauseBtn = wrapper.querySelector(".play-pause"),
  // Seleciona o botão de anterior e o armazena em `prevBtn`
  prevBtn = wrapper.querySelector("#prev"),
  // Seleciona o botão de próximo e o armazena em `nextBtn`
  nextBtn = wrapper.querySelector("#next"),
  // Seleciona o elemento de áudio principal e o armazena em `mainAudio`
  mainAudio = wrapper.querySelector("#main-audio"),
  // Seleciona a área de progresso e a armazena em `progressArea`
  progressArea = wrapper.querySelector(".progress-area"),
  // Seleciona a barra de progresso dentro da área de progresso e a armazena em `progressBar`
  progressBar = progressArea.querySelector(".progress-bar"),
  // Seleciona a lista de músicas e a armazena em `musicList`
  musicList = wrapper.querySelector(".music-list"),
  // Seleciona o botão para mostrar mais músicas e o armazena em `moreMusicBtn`
  moreMusicBtn = wrapper.querySelector("#more-music"),
  // Seleciona o botão de fechar na lista de músicas e o armazena em `closemoreMusic`
  closemoreMusic = musicList.querySelector("#close");

// Inicializa o índice da música com um valor aleatório entre 1 e o número total de músicas
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
// Variável para verificar se a música está pausada; inicializa como verdadeiro
isMusicPaused = true;

// Adiciona um ouvinte de evento para o carregamento da janela
window.addEventListener("load", () => {
  // Carrega a música no índice inicial
  loadMusic(musicIndex);
  // Marca a música atual como tocando
  playingSong();
});

// Função para carregar uma música com base no índice fornecido
function loadMusic(indexNumb) {
  // Atualiza o texto do nome da música
  musicName.innerText = allMusic[indexNumb - 1].name;
  // Atualiza o texto do artista da música
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  // Atualiza o src da imagem da música com base no índice
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  // Atualiza o src do áudio da música com base no índice
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// Função para tocar a música
function playMusic() {
  // Adiciona a classe "paused" ao wrapper para indicar que a música está tocando
  wrapper.classList.add("paused");
  // Altera o ícone do botão de play/pause para "pause"
  playPauseBtn.querySelector("i").innerText = "pause";
  // Reproduz a música
  mainAudio.play();
}

// Função para pausar a música
function pauseMusic() {
  // Remove a classe "paused" do wrapper para indicar que a música está pausada
  wrapper.classList.remove("paused");
  // Altera o ícone do botão de play/pause para "play_arrow"
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  // Pausa a música
  mainAudio.pause();
}

// Função para ir para a música anterior
function prevMusic() {
  // Decrementa o índice da música em 1
  musicIndex--;
  // Se o índice da música for menor que 1, redefine para o comprimento do array para tocar a última música
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  // Carrega a música no novo índice
  loadMusic(musicIndex);
  // Toca a música
  playMusic();
  // Atualiza a música atual como tocando
  playingSong();
}

//next music function
// Função para avançar para a próxima música
function nextMusic() {
  musicIndex++; // Incrementa o índice da música em 1
  // Se o índice da música for maior que o comprimento do array, redefine para 1 para tocar a primeira música
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  // Carrega a nova música com base no índice atualizado
  loadMusic(musicIndex);
  // Reproduz a nova música
  playMusic();
  // Atualiza a música atual como tocando
  playingSong();
}

// Adiciona um ouvinte de evento para o botão de play/pause
playPauseBtn.addEventListener("click", () => {
  // Verifica se a música está tocando ou pausada com base na presença da classe "paused"
  const isMusicPlay = wrapper.classList.contains("paused");
  // Se a música estiver tocando (isMusicPlay é verdadeiro), chama pauseMusic; caso contrário, chama playMusic
  isMusicPlay ? pauseMusic() : playMusic();
  // Atualiza a música atual como tocando
  playingSong();
});

// Adiciona um ouvinte de evento para o botão de música anterior
prevBtn.addEventListener("click", () => {
  // Chama a função para ir para a música anterior
  prevMusic();
});

// Adiciona um ouvinte de evento para o botão de próxima música
nextBtn.addEventListener("click", () => {
  // Chama a função para avançar para a próxima música
  nextMusic();
});

// Adiciona um ouvinte de evento para o elemento de áudio principal para atualizar o progresso da música
mainAudio.addEventListener("timeupdate", (e) => {
  // Obtém o tempo atual da música em reprodução
  const currentTime = e.target.currentTime;
  // Obtém a duração total da música
  const duration = e.target.duration;
  // Calcula a largura da barra de progresso com base no tempo atual e na duração
  let progressWidth = (currentTime / duration) * 100;
  // Atualiza a largura da barra de progresso para refletir o tempo atual
  progressBar.style.width = `${progressWidth}%`;

  // Seleciona os elementos para exibir o tempo atual e a duração da música
  let musicCurrentTime = wrapper.querySelector(".current-time"),
      musicDuration = wrapper.querySelector(".max-duration");

  // Adiciona um ouvinte de evento para quando os dados da música forem carregados
  mainAudio.addEventListener("loadeddata", () => {
    // Obtém a duração total da música
    let mainAdDuration = mainAudio.duration;
    // Converte a duração total em minutos e segundos
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    // Adiciona um zero à frente dos segundos se forem menores que 10
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    // Atualiza o texto da duração da música
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // Converte o tempo atual em minutos e segundos
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  // Adiciona um zero à frente dos segundos se forem menores que 10
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  // Atualiza o texto do tempo atual da música
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Atualiza o tempo da música atual de acordo com a largura da barra de progresso ao clicar nela
progressArea.addEventListener("click", (e) => {
  // Obtém a largura da área de progresso
  let progressWidth = progressArea.clientWidth;
  // Obtém a posição x do clique dentro da área de progresso
  let clickedOffsetX = e.offsetX;
  // Obtém a duração total da música
  let songDuration = mainAudio.duration;
  
  // Calcula o novo tempo da música com base na posição do clique e a duração total
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  // Inicia a reprodução da música
  playMusic();
  // Atualiza a música atual como tocando
  playingSong();
});

// Troca ícone de loop, shuffle e repeat ao clicar no botão correspondente
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  // Obtém o texto atual do ícone do botão
  let getText = repeatBtn.innerText;
  // Altera o ícone e o título baseado no texto atual
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one"; // Muda o ícone para repeat_one
      repeatBtn.setAttribute("title", "Song looped"); // Atualiza o título para indicar que a música será repetida
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle"; // Muda o ícone para shuffle
      repeatBtn.setAttribute("title", "Playback shuffled"); // Atualiza o título para indicar que a reprodução será aleatória
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat"; // Muda o ícone para repeat
      repeatBtn.setAttribute("title", "Playlist looped"); // Atualiza o título para indicar que a lista de reprodução será repetida
      break;
  }
});

// Código para o que fazer após o término da música
mainAudio.addEventListener("ended", () => {
  // Obtém o texto atual do ícone do botão
  let getText = repeatBtn.innerText;
  // Altera o comportamento baseado no texto atual
  switch (getText) {
    case "repeat":
      // Toca a próxima música na lista
      nextMusic();
      break;
    case "repeat_one":
      // Reinicia a música atual e a toca novamente
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      // Gera um índice aleatório para a próxima música
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      // Garante que o índice aleatório não seja o mesmo da música atual
      do {
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      } while (musicIndex == randIndex);
      // Atualiza o índice da música atual e toca a nova música
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

// Mostra a lista de músicas ao clicar no ícone de música
moreMusicBtn.addEventListener("click", () => {
  // Alterna a visibilidade da lista de músicas
  musicList.classList.toggle("show");
});

// Fecha a lista de músicas ao clicar no botão de fechar
closemoreMusic.addEventListener("click", () => {
  // Simula um clique no botão de mostrar lista de músicas para fechar a lista
  moreMusicBtn.click();
});

// Obtém a referência à lista <ul> onde os itens serão adicionados
const ulTag = wrapper.querySelector("ul");

// Cria os itens da lista <li> de acordo com o comprimento do array `allMusic`
for (let i = 0; i < allMusic.length; i++) {
  // Cria um item <li> com informações sobre a música atual
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  // Insere o item <li> no final da lista <ul>
  ulTag.insertAdjacentHTML("beforeend", liTag);

  // Obtém o elemento <span> para a duração da música e o elemento <audio> correspondente
  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  
  // Adiciona um ouvinte de evento para quando os dados do áudio são carregados
  liAudioTag.addEventListener("loadeddata", () => {
    // Obtém a duração do áudio em segundos
    let duration = liAudioTag.duration;
    // Calcula os minutos e segundos totais
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    // Adiciona um zero à esquerda se os segundos forem menores que 10
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    // Atualiza o texto da duração com o tempo total formatado
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
    // Adiciona um atributo `t-duration` com a duração total formatada
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

// Função para marcar a música atualmente tocando na lista
function playingSong() {
  // Obtém todos os itens da lista <li>
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    // Obtém o elemento <span> que mostra a duração da música
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    // Remove a classe "playing" dos itens da lista, se existir
    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      // Recupera a duração original da música
      let adDuration = audioTag.getAttribute("t-duration");
      // Restaura o texto da duração original
      audioTag.innerText = adDuration;
    }

    // Se o índice do item da lista corresponder ao índice da música atual, adicione a classe "playing"
    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      // Altera o texto para "Playing"
      audioTag.innerText = "Playing";
    }

    // Define o atributo `onclick` para chamar a função `clicked` quando o item da lista é clicado
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

// Função para ser chamada quando um item da lista é clicado
function clicked(element) {
  // Obtém o índice do item da lista clicado
  let getLiIndex = element.getAttribute("li-index");
  // Atualiza o índice da música atual com o índice do item clicado
  musicIndex = getLiIndex;
  // Carrega a música correspondente
  loadMusic(musicIndex);
  // Inicia a reprodução da música
  playMusic();
  // Atualiza a lista de músicas para mostrar a música atual tocando
  playingSong();
}

const musicContainer = document.getElementById("music-container");
const btnPlay = document.getElementById("play");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const remix = document.getElementById("cover");
const songs = ["Back in Black-We Will Rock You", "Pumped up Kicks", "Breaking the Habit", "Survivor", "DLZ", "Worlds Smallest Violin"];
let songsIndex = 0;



loadSong(songs[songsIndex]);


function loadSong(song){
    title.innerText = song;
    audio.src = `./audio/${song}.mp3`;
    remix.src = `./img/${song}.jpg`;
}



function playSong(){
    musicContainer.classList.add("play");
    btnPlay.querySelector("i.fa").classList.remove("fa-play");
    btnPlay.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
}



function pauseSong(){
    musicContainer.classList.remove("play");
    btnPlay.querySelector("i.fa").classList.add("fa-play");
    btnPlay.querySelector("i.fa").classList.remove("fa-pause");
    audio.pause();
}



function prevSong(){
    songsIndex--;
    if(songsIndex < 0){
        songsIndex = songs.length - 1;
    }
    loadSong(songs[songsIndex]);
    playSong();
}



function nextSong(){
    songsIndex++;
    if(songsIndex > songs.length - 1){
        songsIndex = 0;
    }
    loadSong(songs[songsIndex]);
    playSong();
}




function updateProgress(e){
    const { duration , currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}



function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}




btnPlay.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});




//  Change the song
btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);


//  Time song Update
audio.addEventListener("timeupdate", updateProgress);
//  Click on progress bar
progressContainer.addEventListener("click", setProgress);



//  Song end
audio.addEventListener("ended", nextSong);
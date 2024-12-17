//Music Playlist Organizer: Store and categorize favorite songs or playlists.

const artistInput = document.querySelector("#artist-input")
const songInput = document.querySelector("#song-input")
const songList = document.querySelector("#song-list")
const musicForm = document.querySelector("#music-form")
const genreInput = document.querySelector("#genre-input")
const sortGenre = document.querySelector("#genre-sort")


let songs = []
const storedSongs = localStorage.getItem("songs")
if (storedSongs) {
   songs = JSON.parse(storedSongs)
   addSong(songs)
}
//Add event listener to submit button
musicForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const musicData = new FormData (musicForm)
    //Nytt songs object
    songs.push({
        artist: musicData.get("artist-input"),
        song: musicData.get("song-input"),
        genre: musicData.get("genre-input")
    })

    artistInput.value = ``
    songInput.value = ``
    saveLocalData()
    addSong(songs)
    sortByGenre()
})

//Funksjon for å lage listen
function addSong(songArr){
    //Making sure duplicates don´t get added
    while (songList.firstChild) {
        songList.firstChild.remove()
    }
    //For each added song, make the container, and text elements then append/prepend
    songArr.forEach((song,i) => {
        //Lager div hvor hver sang og artist skal lagres
        const songContainer = document.createElement("div")
        songContainer.classList.add("song-container")
        //Making the textcontent for artist input
        const artistElem = document.createElement("h2")
        artistElem.textContent = `${song.artist}`
        artistElem.classList.add("artist")
        //Making Image for each song
        const songImage = document.createElement("img")
        songImage.src = "placeholder1.png"
        songImage.classList.add("song-image")

        //Making the textcontent for song input
        const songElem = document.createElement("p")
        songElem.textContent = `${song.song}`
        songElem.classList.add("song")
        //Making a remove option, to remove the song from the list
        const removeSong = document.createElement("button")
        removeSong.textContent = "Remove"
        removeSong.classList.add("remove-song")
        //Event listener for the button, removing the song
        removeSong.addEventListener("click", () => {
            songs.splice(i,1) //Remove the song from the list
            saveLocalData() // Update Local data
            addSong(songs)  //Refreshing the list afterwards
        })
        //Adding a genre 
        const genreElem = document.createElement("p")
        genreElem.textContent = `Genre: ${song.genre}`
    
        genreElem.classList.add("genre")
        //Appending
           
            songContainer.appendChild(songImage)
            songContainer.appendChild(songElem)
            if(genreElem.textContent === `Genre: null`){
                genreElem.textContent = `Not specified`
            }
            songContainer.appendChild(artistElem)
            songContainer.appendChild(genreElem)
            songContainer.appendChild(removeSong)
            songList.prepend(songContainer)
    });
}

function sortByGenre(){
    const selectedGenre = sortGenre.value.toLowerCase(); // Getting the value of the selected option

    let filteredSongs;
    //If else to check which sort option is being used
    //If "all" is selected it will show all songs
    //Else it will show the songs with the matching genre
    if(selectedGenre === "all"){
        filteredSongs = songs;
    } else{
        filteredSongs = songs.filter(song => song.genre?.toLowerCase() === selectedGenre)
    }

    saveLocalData();
    addSong(filteredSongs);

}
sortGenre.addEventListener("change", sortByGenre);

function saveLocalData() {
    //Lagrer data i songs til lokaldata
    localStorage.setItem("songs",JSON.stringify(songs))
}

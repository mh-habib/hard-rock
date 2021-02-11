const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = (`https://api.lyrics.ovh/suggest/${searchText}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        //Strategy to catch error in fetch system
        // .catch(error => displayError(error)); 
        .catch(error => displayError('Something Went Wrong!! Please Try Again Letter'));
}
// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = (`https://api.lyrics.ovh/suggest/${searchText}`);
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySong(data.data);
// }

const displaySong = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = null;

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `<div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! Failed to load lyrics! Please try letter!!');
    }
}

const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById('song-lyrics');
    lyricDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-massage');
    errorTag.innerText = error;
}
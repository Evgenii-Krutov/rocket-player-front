var soundcloudPlayer;
function initMusicServices() {
  DZ.init({
    appId: '333062',
    channelUrl: 'http://localhost/channel.html',
    player: {}
  });
  SC.initialize({
    client_id: '95f22ed54a5c297b1c41f72d713623ef'
  });
  DZ.ready(function (_sdk_options) {
    document.getElementById("play").addEventListener("click", play);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("start-track").addEventListener("click", startTrack);
    document.getElementById("sc-play").addEventListener("click", scPlay);
    document.getElementById("sc-stop").addEventListener("click", scStop);
    document.getElementById("sc-start-track").addEventListener("click", scStartTrack);
  });
  DZ.Event.subscribe('player_position', function(e) {
    localStorage.setItem('trackPosition', e[0]/e[1]);
    document.getElementById("update-track-line").click();
  });
  document.getElementById("dz-root").addEventListener("click", getDZObject);
};

function getDZObject() {
  DZ.login(function (response) {
    if (response.authResponse.accessToken) {
      localStorage.setItem("accessToken", response.authResponse.accessToken);
      document.getElementById("login").click();
    }
  }, { perms: 'basic_access,email' });
};

function play() {
  if (soundcloudPlayer) {
    soundcloudPlayer.pause();
  }
  DZ.player.play();
}

function startTrack() {
  if (soundcloudPlayer) {
    soundcloudPlayer.pause();
  }
  const trackId = localStorage.getItem('trackId');
  DZ.player.pause();
  DZ.player.playTracks([trackId]);
}

function stop() {
  if (soundcloudPlayer) {
    soundcloudPlayer.pause();
  }
  DZ.player.pause();
}

function scStartTrack() {
  DZ.player.pause();
  const trackId = localStorage.getItem('trackId');
  return SC.stream('/tracks/' + trackId).then(function(player){
    player.on("time", function(e) {
      const duration = player.getDuration();
      var percent = Math.round(e/1000)/Math.round(duration/1000)
      localStorage.setItem('trackPosition', percent);
      document.getElementById("update-track-line").click();
    });
    if (soundcloudPlayer) {
      soundcloudPlayer.pause();
    }
    soundcloudPlayer = window.soundcloudPlayer = player;
    scPlay();
  }).catch(function(e){
    console.error(e);
  });
};

function scPlay() {
  DZ.player.pause();
  if (soundcloudPlayer) {
    soundcloudPlayer.play().catch(function(e){
      console.error('Playback rejected.', e);
    });
  }
}

function scStop() {
  DZ.player.pause();
  if (soundcloudPlayer) {
    soundcloudPlayer.pause().catch(function(e){
      console.error('An error occured.', e);
    });
  }
}

function codeAddress() {
  DZ.init({
    appId: '333062',
    channelUrl: 'http://localhost/channel.html',
    player: {}
  });
  DZ.ready(function (_sdk_options) {
    document.getElementById("play").addEventListener("click", play);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("start-track").addEventListener("click", startTrack);
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
  DZ.player.play();
}

function startTrack() {
  const trackId = localStorage.getItem('trackId');
  DZ.player.playTracks([trackId]);
}

function stop() {
  DZ.player.pause();
}
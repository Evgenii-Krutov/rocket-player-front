function codeAddress() {
  DZ.init({
    appId: '333062',
    channelUrl: 'http://localhost/channel.html',
    player: {}
  });
  document.getElementById("dz-root").addEventListener("click", getDZObject);
};

function getDZObject() {
  DZ.login(function (response) {
    console.log("RESPONSE: ", JSON.stringify(response));
    DZ.ready(function (_sdk_options) {
      DZ.player.playTracks(['68973465']);
      document.getElementById("play").addEventListener("click", play);
      document.getElementById("stop").addEventListener("click", stop);
    });
  }, { perms: 'basic_access,email' });
};

function play() {
  DZ.player.play();
}

function stop() {
  DZ.player.pause();
}
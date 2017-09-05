var streamers = ['angryjoeshow', 'myre_test', 'starcitizen', 'freecodecamp', 'drdisrespectlive', 'kamet0', 'gmart', 'shroud'];
var rb = document.getElementById('reqbtn');
var content = document.getElementById('content');
document.addEventListener("DOMContentLoaded", function() {
  getStreamData();
  });
function getStreamData() {
  content.innerHTML = "";
  streamers.forEach(function(streamer) {
    function getAddress (route, id) {
      return 'https://wind-bow.glitch.me/twitch-api/' + route + id + '?callback=';
    };
    var streamRequest = new XMLHttpRequest();
    streamRequest.open ('GET', getAddress('streams/', streamer), true);
    streamRequest.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        console.log(data);
        var stat;
        var game;
        var preview;
        var previewText;
        if (data.stream === null) {
          stat = '<div class = "offline">Offline</div>';
          game = 'Offline';
          preview = 'https://image.ibb.co/jCfqbv/offline.jpg';
          previewText = 'Visit Channel'
        } else if (data.stream === undefined) {
          stat = '<div class = "offline">Offline</div>';
          game = 'Offline';
          preview = 'https://image.ibb.co/jCfqbv/offline.jpg';
          previewText = 'Visit Channel'
        } else {
          stat = '<div class = "online">Online</div>';
          game = data.stream.game;
          preview = data.stream.preview.medium;
          previewText = 'Go To Stream'
        };
        var channelRequest = new XMLHttpRequest();
        channelRequest.open ('GET', getAddress('channels/', streamer), true);
        channelRequest.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            var data2 = JSON.parse(this.response);
            console.log(data2);
            var name;
            if (data2.display_name != null) {
              name = data2.display_name;
            } else {
              name = streamer;
            }
            var output = document.createElement("div");
            var shellFront = '<div class = "set"><div class = "shell" id = "shell">';
            var dropBar = '<div class = "topbar" onClick = "hey(' + streamer + ')"></div>';
            var left = '<div class = "g0"><img class = "img-responsive pic" src = "' + data2.logo + '"></div>';
            var middle = '<div class = "g1"><div class = "strmr">' + name + '</div><div class = "game">' + game + '</div><div class = "marquee"><marquee behavior="scroll" direction="left">' + data2.status + '</marquee></div></div>';
            var right = '<div class = "g2">' + stat + '</div>';
            var vidBox = '<div id = "' + streamer + '" class = "notDropped"><a href = "' + data2.url + '"><div id = "videobanner"><img src = "' + preview + '"><div class = "DD_overtext">' + previewText + '</div></div></a></div>'
            var shellEnd = '</div>' + vidBox + '</div><br>';
            output.innerHTML = shellFront + dropBar + left + middle + right + shellEnd;
            if (game === 'Offline') {
              content.append(output);
            } else {
              content.prepend(output);
            };
          } else {
          };
        };
        channelRequest.onerror = function() {
          console.log('channelRequest Error');
        };
        channelRequest.send();
      } else {
      };
    };
    streamRequest.onerror = function() {
      console.log('streamRequest Error');
    };
    streamRequest.send();
  });
};

rb.addEventListener('click', function() { 
  content.innerHTML = '';
  getStreamData();
});

function addStreamer(form) {
  var userRequest = new XMLHttpRequest();
  var search = form.searchbox.value.toLowerCase();
  var exists = streamers.includes(search);
  function getAddress (route, id) {
    return 'https://wind-bow.glitch.me/twitch-api/' + route + id + '?callback=';
  };
  userRequest.open ('GET', getAddress('users/', search), true);
  userRequest.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
      console.log(data);
      console.log('return');
      if (data.status > 399) {
        console.log('does not exist');
        alert('Streamer "' + search + '" Not Found');
      } else if (exists === true) {
        alert(search + ' Already Exists');
      } else {
        streamers.push(search);
        getStreamData();
      };
    } else {
    };
  };
  userRequest.onerror = function() {
    console.log('userRequest Error');
  };
  userRequest.send();
};
document.querySelector('#addField').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) { 
    addStreamer(this.form);
    console.log('enter');
  } else {     
  };
});

function hey(id) {
  if(id.className === 'notDropped') {
    id.className = 'dropped';
  } else {
    id.className = 'notDropped';
  }
}
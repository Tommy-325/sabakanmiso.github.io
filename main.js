
var btn;
var icon; // アイコンのimg要素
var output = document.getElementById('output');

var recognition;
let utterance = '';

function fn() {
    // SpeechRecognitionの準備
    SpeechRecognition = webkitSpeechRecognition ||SpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; // 言語コード
    recognition.interimResults = true;
    recognition.onend = endfn;
    recognition.onresult = disp;
}

function disp(event) {
    utterance = event.results[0][0].transcript;
}

function endfn() {
    btn = document.getElementById('btn');
    btn.setAttribute('onclick', 'start()');
    icon =  document.getElementById('icon');
    icon.src = '2x/baseline_mic_black_24dp.png'; // マイクアイコンに切り替え
    console.log('stop_' + icon.src + '_' + btn.getAttribute('onclick'));
    if (utterance != '') {
        output.innerHTML = "<br>" + utterance + output.innerHTML;
    }
}

function stop() {
    // 録音停止の処理
    recognition.stop();
}
function start() {
    // 録音開始の処理
    utterance = '';
    btn = document.getElementById('btn');
    btn.setAttribute('onclick', 'stop()');
    icon = document.getElementById('icon');
    icon.src = '2x/baseline_stop_black_24dp.png'; // ストップアイコンに切り替え
    console.log('start_' + icon.src + '_' + btn.getAttribute('onclick'));
    fn();
    recognition.start();
}
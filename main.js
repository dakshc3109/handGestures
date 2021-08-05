var prediction1 = "smile";
var prediction2 = "sad";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_sanpshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>";
    });
};

console.log("ml5.version: ",ml5.version);

var classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/KGDZIXPUZ/model.json", modelLoaded);

function modelLoaded(){
    console.log("ml5 loaded");
};

function check(){
    var synth = window.speechSynthesis;
    var speak_data_1 = "The first prediction is "+prediction1;
    var speak_data_2 = " and second one is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}


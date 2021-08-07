var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_qualit: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>";
    });
};

console.log("ml5.version: ",ml5.version);

var classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/KGDZIXPUZ/model.json", modelLoaded);

function modelLoaded(){
    console.log("model successfully loaded!");
};

function check(){
    var img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
};

function gotResult(error, result){
    if(error){
        console.error();
    }
    else{
        console.log(result);
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        Speak();
        if(result[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "✌";
        }
        if(result[0].label == "best"){
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if(result[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "👌";
        }

        if(result[1].label == "Victory"){
            document.getElementById("update_emoji2").innerHTML = "✌";
        }
        if(result[1].label == "best"){
            document.getElementById("update_emoji2").innerHTML = "👍";
        }
        if(result[1].label == "Amazing"){
            document.getElementById("update_emoji2").innerHTML = "👌";
        };
    }
}

function Speak(){
    var synth = window.speechSynthesis;
    var speak1 = "The first prediction is "+prediction1;
    var speak2 = " and second is "+prediction2;
    var utter = new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utter); 
}
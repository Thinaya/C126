song ="";
leftWirstX = 0;
leftWristY = 0;
rightWrist = 0;
rightWrist = 0;

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    postNet = ml5.postNet(video, modelLoaded);
    postNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY" + rightWristY);

    }
}

function modelLoaded() {
console.log('PoseNet Is Intialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.setVolume(1);
    song.rate(2)
    song.play();
}
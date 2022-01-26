song ="";
leftWristX = 0;
leftWristY = 0;
rightWrist = 0;
rightWrist = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0)
    {
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
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

    fill("lightseagreen");
    stroke("lightseagreen");
    ABC_status = ABC_song.isPlaying();
    Believer_status = Believer.isPlaying();
    if(scoreLeftWrist > 0.2)
    {
        fill("lightseagreen");
    stroke("lightseagreen");
        circle(leftWristX, leftWristY, 20);
        Believer.stop();
        if(ABC_status == false)
        {
           ABC_song.play();
           document.getElementById(song).innerHTML= "ABC_song";
               
        }
    }
    fill("#b6e08f");
    stroke("#b6e08f");
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        ABC_song.stop();
        if(Believer_status == false)
        {
            Believer.play();
            document.getElementById(song).innerHTML= "Believer";
    
        }
    }
    
    


}

function preload() {
    Believer = loadSound("Believer.mp3");
    ABC_song = loadSound("ABC song.mp3");
}

function play() {
    song.setVolume(1);
    song.rate(2)
    song.play();
}

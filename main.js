img = "";
status1 = "";
objects = [];
function preload()
{
    
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    //executing cocossd model//
    object_detected.detect(video, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    //asigning the value of results into the array objects//
    objects = results;
    
}

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
 
}

function draw()
{
    image(video, 0, 0, 500, 400);
    //If the model is loaded, then the status will not be empty//
    if(status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number-of-objects").innerHTML = "Number of objects detected are : " + objects.length;
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function start()
{
       //initializing the cocossd model//
    object_detected = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}
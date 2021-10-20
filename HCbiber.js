
const video = document.getElementById("hcvideo");

const imza = document.getElementById("dvimza");


// butun Modelleri Yükle
Promise.all(
    [
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")

    ]
).then(StartCamera());

function StartCamera()
{
   //          return false;
    navigator.getUserMedia({
        video:{}
    },
    stream => (video.srcObject = stream)
    ,err => console.log(err)
    )
};

video.addEventListener("play", () => 
{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const boxSize = {
        width: video.width,
        height: video.height
      };

      faceapi.matchDimensions(canvas, boxSize);

      setInterval( async() => {
        const detections = await faceapi.detectAllFaces(video, 
              new faceapi.TinyFaceDetectorOptions() )
              .withFaceLandmarks()
              .withFaceExpressions();

              canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
              const resizedDetections = faceapi.resizeResults(detections, boxSize);
          
              faceapi.draw.drawDetections(canvas, resizedDetections);
          
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

              ZamanIslem();

        },20);

}

);


function ZamanIslem()
{
    let Zaman = new Date();

    imza.innerText = `Saat : ${Zaman.getHours()} : ${Zaman.getMinutes()} : ${Zaman.getSeconds()} . ${Zaman.getMilliseconds()} `;
}


/* Video Aktif olunca çalışacak event ekliyoruz */
/*
video.addEventListener("play",() => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const boxSize = {
        width: video.width,
        height: video.height
      }

});

faceapi.matchDimensions(canvas, boxSize);

setInterval( async()=>{
    //async
    // await
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();   
      
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      const resizedDetections = faceapi.resizeResults(detections, boxSize);
  
      faceapi.draw.drawDetections(canvas, resizedDetections);
  
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);      

}, 100);


*/
//StartCamera(); // Kamerayı Açmak İçin
/*
video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const boxSize = {
      width: video.width,
      height: video.height
    }
};
faceapi.matchDimensions(canvas, boxSize);

  setInterval(async () => {
    //async
    // await
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    const resizedDetections = faceapi.resizeResults(detections, boxSize);

    faceapi.draw.drawDetections(canvas, resizedDetections);

    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // console.log(detections);
  }, 100);
});
*/
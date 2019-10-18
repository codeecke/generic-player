import {GenericPlayer} from './players/generic/GenericPlayer';

const videoElement = document.createElement('video');
videoElement.src = 'https://www.youtube.com/watch?v=wXhTHyIgQ_U&list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG';
// videoElement.src = 'https://vimeo.com/366068103';
document.body.appendChild(videoElement);

const player = new GenericPlayer(videoElement);
player.play();


// Idee für die Zukunft
// ---------------------------
// Mit GenericPlayer.find kann man nach GenericPlayer-Referenzen suchen 
// indem man den originalTag, den neuen Tag oder einen selector-string (für den neuen Tag) übergibt

/*
player.whenReady().then(() => {
  const 
    iframe = document.querySelector('iframe'),
    secondReferemceOfPlayerInstance = GenericPlayer.find(iframe),
    thirdReferemceOfPlayerInstance = GenericPlayer.find(videoElement),
    fourthReferenceOfPlayerInstance = GenericPlayer.find('iframe');
});
/**/
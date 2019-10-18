import {GenericPlayer} from "./players/generic/GenericPlayer";

window.addEventListener('DOMContentLoaded', () => {
   document.body.querySelectorAll('video').forEach(element => new GenericPlayer(element));
});
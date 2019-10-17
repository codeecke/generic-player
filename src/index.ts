import {playerRegistry} from './registries/player-registry';
import {GenericPlayer} from './players/generic-player';

exports.playerRegistry = playerRegistry;
exports.Player = GenericPlayer;

console.log(playerRegistry.fetchAll());
import {playerRegistry} from './registries/PlayerRegistry';
import {GenericPlayer} from './players/GenericPlayer';

exports.playerRegistry = playerRegistry;
exports.Player = GenericPlayer;

console.log(playerRegistry.fetchAll());
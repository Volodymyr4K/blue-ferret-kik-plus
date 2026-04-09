import gamesData from '@/content/games.json';
import { GamesSchema, type Game, type GamePassport, type GameStage } from '@/lib/content-schemas';

const games = GamesSchema.parse(gamesData);

export type { Game, GamePassport, GameStage };
export default games;

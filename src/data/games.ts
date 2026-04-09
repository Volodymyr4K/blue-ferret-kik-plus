import gamesData from '@/content/games.json';
import type { Game, GamePassport, GameStage } from './types';

const games = gamesData as Game[];

export type { Game, GamePassport, GameStage };
export default games;

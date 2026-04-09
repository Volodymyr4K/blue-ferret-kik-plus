import gamesData from '@/content/games.json';
import gamesBasicData from '@/content/manager/games-basic.json';
import {
  GamesBasicOverridesSchema,
  GamesSchema,
  type Game,
  type GamePassport,
  type GameStage,
} from '@/lib/content-schemas';

const baseGames = GamesSchema.parse(gamesData);
const basicOverrides = GamesBasicOverridesSchema.parse(gamesBasicData);
const overridesById = new Map(basicOverrides.map((item) => [item.id, item]));

const games = GamesSchema.parse(
  baseGames.map((game) => {
    const override = overridesById.get(game.id);
    if (!override) return game;

    return {
      ...game,
      name: override.name,
      slogan: override.slogan,
      shortDescription: override.shortDescription,
      aboutGame: override.aboutGame,
      status: override.status,
      heroImage: override.heroImage,
      coverImage: override.coverImage,
      price: override.price,
    };
  })
);

export type { Game, GamePassport, GameStage };
export default games;

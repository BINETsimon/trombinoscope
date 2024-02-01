import { PictureState } from './trombiState';

export interface GameState {
    file: PictureState,
    possibilities: string[];
    score: number;
}
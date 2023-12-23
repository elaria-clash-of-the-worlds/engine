import ElariaGame from "../core/ElariaGame.js";
import ExampleLevel1 from "./ExampleLevel1.js";
import SceneManager from "../core/SceneManager.js";

const game = new ElariaGame();

SceneManager.registerScene(new ExampleLevel1());

game.start(0);
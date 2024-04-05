const {Component, Game, Text} = elaria;

export default class FPSCounter extends Component
{
    #updateCount = 0;
    awake() {
        this.fpsLabel = this.addComponent(Text);
        this.fpsLabel.horizontalAlign = "right";
        this.fpsLabel.verticalAlign = "top";
        this.updateRate = 5;
    }

    update(dt) {
        this.#updateCount += 1;
        if (this.#updateCount >= this.updateRate) {
            this.#updateCount = 0;
            this.fpsLabel.text = Math.floor(Game.instance.fps).toString();
        }
    }
}
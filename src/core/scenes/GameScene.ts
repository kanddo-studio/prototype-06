import Phaser from "phaser";

import { Entity } from "kanji-ecs/core";

import {
  PositionComponent,
  VelocityComponent,
  InputComponent,
} from "kanji-ecs/components";

import { CameraComponent } from "../components/CameraComponent";

import { MovementSystem } from "../systems/MovementSystem";
import { KeyboardSystem } from "../systems/KeyboardSystem";
import { CameraSystem } from "../systems/Camera/CameraSystem";
import { CameraZoomSystem } from "../systems/Camera/CameraZoomSystem";
import { CameraDragNDropSystem } from "../systems/Camera/CameraDragNDropSystem";

import * as Utils from "../utils";
import { PhysicsComponent } from "../components/PhysicsComponent";
import { PhysicsSystem } from "../systems/PhysicsSystem";

export class GameScene extends Phaser.Scene {
  player!: Entity;
  movementSystem!: MovementSystem;
  keyboardSystem!: KeyboardSystem;
  cameraSystem!: CameraSystem;
  cameraZoomSystem!: CameraZoomSystem;
  cameraDragNDropSystem!: CameraDragNDropSystem;
  physicsSystem!: PhysicsSystem;

  constructor() {
    super("game-scene");
  }

  preload() {
    this.load.image("player", "assets/images/game/player.png");
  }

  create() {
    // World Building
    const worldSize = 400;
    this.physics.world.setBounds(0, 0, worldSize, worldSize);
    Utils.createGrid(this, worldSize);

    // Physics Sprites
    const sprite = this.physics.add.sprite(0, 0, "player", 0);

    // Entities
    this.player = new Entity();

    // Components
    const positionComponent = new PositionComponent(200, 200);
    const velocityComponent = new VelocityComponent(400);
    const inputComponent = new InputComponent();
    const cameraComponent = new CameraComponent();
    const physicsComponent = new PhysicsComponent(
      sprite,
      positionComponent.x,
      positionComponent.y,
    );

    // Add Components to Player
    this.player.add("velocity", velocityComponent);
    this.player.add("position", positionComponent);
    this.player.add("input", inputComponent);
    this.player.add("camera", cameraComponent);
    this.player.add("physics", physicsComponent);

    // Systems
    this.movementSystem = new MovementSystem();
    this.keyboardSystem = new KeyboardSystem(this);
    this.cameraSystem = new CameraSystem(this, this.player);
    this.cameraZoomSystem = new CameraZoomSystem(this, this.player);
    this.cameraDragNDropSystem = new CameraDragNDropSystem(this, this.player);
    this.physicsSystem = new PhysicsSystem();
  }

  update(_time: number) {
    this.movementSystem.update([this.player]);
    this.keyboardSystem.update([this.player]);
    this.physicsSystem.update([this.player]);
    this.cameraSystem.update();
  }
}

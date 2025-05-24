import { Component } from "kanji-ecs";

export class CameraComponent implements Component {
  constructor(
    public zoom: number = 1,
    public minZoom: number = 0.5,
    public maxZoom: number = 3,
    public isDragging: boolean = false,
    public dragStartX: number = 0,
    public dragStartY: number = 0,
    public isFixed: boolean = true,
  ) {}
}

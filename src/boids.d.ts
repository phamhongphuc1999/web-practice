declare module 'boids' {
  interface BoidsOptions {
    boids?: number;
    speedLimit?: number;
    accelerationLimit?: number;
    separationDistance?: number;
    alignmentDistance?: number;
    cohesionDistance?: number;
    separationForce?: number;
    alignmentForce?: number;
    cohesionForce?: number;
    attractors?: Array<[number, number, number, number]>;
  }

  export type Boid = [number, number, number, number, number, number];

  export interface Flock {
    boids: Boid[];
    tick(): void;
  }

  function createBoids(options: BoidsOptions): Flock;

  export = createBoids;
}

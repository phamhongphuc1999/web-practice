/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'venn.js' {
  export interface VennSet {
    sets: string[];
    size: number;
  }

  export function VennDiagram(): any;
}

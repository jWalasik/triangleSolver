interface Sides {
    [key: string]: number | null;
}
interface Angles {
    [key: string]: number | null;
}
interface Alt {
    sides: Sides;
    angles: Angles;
}
interface Constructor {
    [index: string]: number | null;
}
interface Validator {
    [index: string]: number;
}
export default class Triangle {
    sides: Sides;
    angles: Angles;
    validator: Validator;
    area: number | null;
    status: string;
    alt: Alt;
    constructor({ a, b, c, A, B, C }: Constructor);
    toRad(angle: number): number;
    toDeg(angle: number): number;
    algorithmMap: {
        SSS: () => void;
        SAS: () => void;
        AAS: () => void;
        sSA: () => void;
        SsA: () => void;
        ASA: () => void;
    };
    validateInput(): void;
    validateResults(): void;
    roundResults(): void;
    pickAlgorithm(): "SSS" | "AAS" | "ASA" | "SsA" | "sSA" | "SAS";
    update(idx: string, value: any): void;
    getCoordinates(size: number, inverted?: boolean): {
        Ax: number;
        Ay: number;
        Bx: number;
        By: number;
        Cx: number;
        Cy: number;
    };
    draw(canvas: any, color: string): void;
    solve(): Promise<unknown>;
}
export {};

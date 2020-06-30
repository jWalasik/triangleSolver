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
    update({ a, b, c, A, B, C }: Constructor): void;
    draw(canvas: any): void;
    solve(): string | {
        angles: Angles;
        sides: Sides;
    } | {
        angles: Angles;
        sides: Sides;
    }[];
}
export {};

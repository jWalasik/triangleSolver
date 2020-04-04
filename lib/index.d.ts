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
export default class Triangle {
    sides: Sides;
    angles: Angles;
    area: number | null;
    status: string;
    alt: Alt;
    s: number;
    A: number;
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
    pickAlgorithm(): "SSS" | "AAS" | "ASA" | "SsA" | "sSA" | "SAS";
    update(): void;
    draw(height?: number): string;
    solve(): string | {
        angles: Angles;
        sides: Sides;
    } | {
        angles: Angles;
        sides: Sides;
    }[];
}
export {};

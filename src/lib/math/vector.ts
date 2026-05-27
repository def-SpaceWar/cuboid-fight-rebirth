import { FxPt } from "./fixed_point";

export type Vec2 = BigInt64Array & { length: 2; };
export namespace Vec2 {
    export function toNum(v: Vec2): [number, number] {
        return [FxPt.toNum(v[0]), FxPt.toNum(v[1])];
    }

    export function xy(x: FxPt = 0n, y: FxPt = 0n): Vec2 {
        const out = new BigInt64Array(2);
        out[0] = x;
        out[1] = y;
        return out as Vec2;
    }

    export const x = (x: FxPt = FxPt.ONE): Vec2 => xy(x, 0n);
    export const y = (y: FxPt = FxPt.ONE): Vec2 => xy(0n, y);

    export function add(a: Vec2, b: Vec2, out = Vec2.xy()): Vec2 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
    }

    export function sub(a: Vec2, b: Vec2, out = Vec2.xy()): Vec2 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
    }

    export function scale(a: Vec2, scalar: FxPt, out = Vec2.xy()): Vec2 {
        out[0] = FxPt.mul(a[0], scalar);
        out[1] = FxPt.mul(a[1], scalar);
        return out;
    }

    export const dot = (a: Vec2, b: Vec2): FxPt => FxPt.mul(a[0], b[0]) + FxPt.mul(a[1], b[1]);
    export const lengthSq = (a: Vec2): FxPt => FxPt.mul(a[0], a[0]) + FxPt.mul(a[1], a[1]);
    export const length = (a: Vec2): FxPt => FxPt.sqrt(lengthSq(a));
    export const getAngle = (a: Vec2): FxPt => FxPt.atan2(a[1], a[0]);
    export const distanceSq = (a: Vec2, b: Vec2): FxPt => lengthSq(Vec2.sub(a, b));
    export const distance = (a: Vec2, b: Vec2): FxPt => FxPt.sqrt(distanceSq(a, b));
    export const angleBetween = (a: Vec2, b: Vec2): FxPt => FxPt.acos(FxPt.div(Vec2.dot(a, b), FxPt.mul(length(a), length(b))));

    export function normalize(a: Vec2, out: Vec2): Vec2 {
        const len = lengthSq(a);
        if (len === 0n) {
            out[0] = 0n;
            out[1] = 0n;
            return out;
        }
        const invLen = FxPt.div(FxPt.ONE, FxPt.sqrt(len));
        scale(a, invLen, out);
        return out;
    }

    export function rotate(a: Vec2, rad: FxPt, out = Vec2.xy()): Vec2 {
        const s = FxPt.sin(rad);
        const c = FxPt.cos(rad);
        const x = a[0];
        const y = a[1];
        out[0] = FxPt.mul(x, c) - FxPt.mul(y, s);
        out[1] = FxPt.mul(x, s) + FxPt.mul(y, c);
        return out;
    }
}

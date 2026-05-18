export class FixedP {
    private static readonly SHIFT = 32n;
    private static readonly _ONE = 1n << this.SHIFT;
    private static readonly _HALF = 1n << (this.SHIFT - 1n);
    private static readonly _PI = 13508517176n;
    private static readonly _HALF_PI = 6754258588n;
    private static readonly _TWO_PI = 27017034352n;

    public static readonly ONE = new FixedP(this._ONE);
    public static readonly PI = new FixedP(this._PI);
    public static readonly HALF_PI = new FixedP(this._HALF_PI);

    private constructor(private val: bigint) { }

    public toFloat() {
        return Number(this.val) / Number(FixedP._ONE);
    }

    public static fromInt(int: number): FixedP {
        return new FixedP(BigInt(int) << this.SHIFT);
    }

    public static fromFloat(float: number): FixedP {
        return new FixedP(BigInt(Math.floor(float * Number(this._ONE))));
    }

    public static add(a: FixedP, b: FixedP): FixedP {
        return new FixedP(a.val + b.val);
    }

    public static subtract(a: FixedP, b: FixedP): FixedP {
        return new FixedP(a.val - b.val);
    }

    public static mul(a: FixedP, b: FixedP): FixedP {
        const p = a.val * b.val;
        const r = (p < 0n) ? p - this._HALF : p + this._HALF;
        return new FixedP(r / this._ONE);
    }

    public static div(a: FixedP, b: FixedP): FixedP {
        if (b.val === 0n) throw "Division by 0 error!";
        const numerator = a.val << this.SHIFT;
        return new FixedP(numerator / b.val);
    }

    static sqrt(n: FixedP): FixedP {
        if (n.val < 0n) throw "Square root a negative error!";
        if (n.val === 0n) return new FixedP(0n);
        let x = n.val > this._ONE ? n.val : this._ONE;
        let y = (x + this.div(n, new FixedP(x)).val) >> 1n;
        while (y < x) {
            x = y;
            y = (x + this.div(n, new FixedP(x)).val) >> 1n;
        }
        return new FixedP(x);
    }

    static ipow(base: FixedP, exp: number): FixedP {
        let res = this.ONE;
        let b = base;
        let e = Math.abs(exp);
        while (e > 0) {
            if (e % 2 === 1) res = this.mul(res, b);
            b = this.mul(b, b);
            e = Math.floor(e / 2);
        }
        return exp < 0 ? this.div(this.ONE, res) : res;
    }

    static exp(x: FixedP): FixedP {
        if (x.val === 0n) return this.ONE;
        if (x.val < 0n) return this.div(this.ONE, this.exp(new FixedP(-x.val)));
        let sum = this.ONE;
        let term = this.ONE;
        for (let i = 1; i < 14; i++) {
            term = this.mul(term, this.div(x, this.fromInt(i)));
            sum = this.add(sum, term);
        }
        return sum;
    }

    private static readonly LUT_SIZE = 4096n;
    private static SIN_TABLE = new BigInt64Array(4096);

    static {
        for (let i = 0; i < 4096; i++) {
            const angle = Math.PI / 2048 * i;
            const val = Math.floor(Math.sin(angle) * Number(this._ONE));
            this.SIN_TABLE[i] = BigInt(val);
        }
    }

    private static getIdx(angle: FixedP): number {
        const wrapped = ((angle.val % this._TWO_PI) + this._TWO_PI) % this._TWO_PI;
        return Number((wrapped * this.LUT_SIZE) / this._TWO_PI) % 4096;
    }

    static sin(a: FixedP): FixedP { return new FixedP(this.SIN_TABLE[this.getIdx(a)]); }
    static cos(a: FixedP): FixedP { return this.sin(this.add(a, this.HALF_PI)); }
    static tan(a: FixedP): FixedP | undefined {
        const c = this.cos(a);
        return c.val === 0n ? undefined : FixedP.div(this.sin(a), c);
    }

    static atan2(y: FixedP, x: FixedP): FixedP {
        if (x.val === 0n && y.val === 0n) return new FixedP(0n);

        const absX = x.val < 0n ? -x.val : x.val;
        const absY = y.val < 0n ? -y.val : y.val;

        const swap = absX < absY;
        const t = swap ? this.div(new FixedP(absX), new FixedP(absY))
            : this.div(new FixedP(absY), new FixedP(absX));

        const c1 = this.fromFloat(-0.3333333);
        const c2 = this.fromFloat(0.1999991);
        const c3 = this.fromFloat(-0.1428467);
        const c4 = this.fromFloat(0.1110901);
        const c5 = this.fromFloat(-0.0895025);
        const c6 = this.fromFloat(0.0697945);
        const c7 = this.fromFloat(-0.0401825);

        const t2 = this.mul(t, t);
        let r = this.mul(c7, t2);
        r = this.mul(this.add(r, c6), t2);
        r = this.mul(this.add(r, c5), t2);
        r = this.mul(this.add(r, c4), t2);
        r = this.mul(this.add(r, c3), t2);
        r = this.mul(this.add(r, c2), t2);
        r = this.mul(this.add(r, c1), t2);
        r = this.mul(this.add(r, this.ONE), t);

        if (swap) r = this.subtract(this.HALF_PI, r);
        if (x.val < 0n) r = this.subtract(this.PI, r);
        if (y.val < 0n) r = new FixedP(-r.val);

        return r;
    }

    static asin(x: FixedP): FixedP {
        if (x.val > this.ONE.val || x.val < -this.ONE.val) throw "Domain Error!";
        return this.atan2(x, this.sqrt(this.subtract(this.ONE, this.mul(x, x))));
    }

    static acos(x: FixedP): FixedP {
        return this.subtract(this.HALF_PI, this.asin(x));
    }
}

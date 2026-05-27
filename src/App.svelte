<script lang="ts">
    import { FxPt } from "./lib/math/fixed_point";

    const a: FxPt = FxPt.atan2(FxPt.fromInt(-5), FxPt.fromInt(-5));
    console.log(
        FxPt.toNum(a),
        FxPt.toNum(FxPt.sin(a)),
        FxPt.toNum(FxPt.cos(a)),
        FxPt.toNum(FxPt.tan(a)),
    );

    const b = FxPt.exp(FxPt.fromInt(1));
    console.log(FxPt.toNum(b), FxPt.toNum(FxPt.ln(b)));

    const c = FxPt.sqrt(FxPt.fromInt(25));
    console.log(
        FxPt.toNum(c),
        FxPt.toNum(FxPt.ipow(c, 2)),
        FxPt.toNum(FxPt.pow(c, FxPt.fromInt(2))),
    );
</script>

<h1>yep</h1>

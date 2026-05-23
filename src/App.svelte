<script lang="ts">
    import { FxPt } from "./lib/math/fixed_point";

    const a: FxPt = FxPt.atan2(FxPt.fromInt(1), FxPt.fromInt(1));
    console.log(
        FxPt.toFloat(a),
        FxPt.toFloat(FxPt.sin(a)),
        FxPt.toFloat(FxPt.cos(a)),
    );

    const b = FxPt.exp(FxPt.fromInt(1));
    console.log(FxPt.toFloat(b), FxPt.toFloat(FxPt.ln(b)));

    const c = FxPt.sqrt(FxPt.fromInt(25));
    console.log(
        FxPt.toFloat(c),
        FxPt.toFloat(FxPt.ipow(c, 2)),
        FxPt.toFloat(FxPt.pow(c, FxPt.fromInt(2))),
    );
</script>

<h1>yep</h1>

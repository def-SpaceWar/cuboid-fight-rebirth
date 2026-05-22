<script lang="ts">
    import { FxPt } from "./lib/fixed_point";

    const a: FxPt = FxPt.atan2(FxPt.fromInt(1), FxPt.fromInt(1));
    console.log(FxPt.toFloat(a), FxPt.toFloat(FxPt.sin(a)), FxPt.toFloat(FxPt.cos(a)));
</script>

<h1>yep</h1>

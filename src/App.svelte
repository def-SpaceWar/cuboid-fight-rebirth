<script lang="ts">
    import { FixedP } from "./lib/fixed_point";

    const a = FixedP.fromFloat(2);
    const b = FixedP.fromFloat(1);
    const c = FixedP.atan2(a, b);
    console.log(c.toFloat());
    console.log(FixedP.tan(c)!.toFloat());
</script>

<h1>yep</h1>

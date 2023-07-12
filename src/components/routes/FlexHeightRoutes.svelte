<script lang="ts">
  import type { ComponentType } from "svelte";

  export let component: ComponentType;
</script>

<div class="pb-3 pr-3 pt-16 h-full">
  <svelte:component this="{component}" />
</div>

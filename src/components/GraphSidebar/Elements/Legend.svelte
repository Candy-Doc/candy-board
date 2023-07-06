<script lang="ts">
  import type { patternLegend } from "../types";

  let patternsLegend: Array<patternLegend> = [
    { label: "Bounded Context", bgColor: "bg-[#FFFFFF00]", classes: "boundedContext"},
    { label: "Aggregate", bgColor: "bg-[#d1ece7]", classes: "aggregate"},
    { label: "Entity", bgColor: "bg-[#fcf3cf]", classes: "entity"},
    { label: "Value object", bgColor: "bg-[#d9f7a5]", classes: "valueObject"},
    { label: "Event", bgColor: "bg-[#f9dd9a]", classes: "event"},
    { label: "Command", bgColor: "bg-[#adebff]", classes: "command"},
    { label: "Service", bgColor: "bg-[#a3e4d7]", classes: "service"},
    { label: "Repository", bgColor: "bg-[#aed6f1]", classes: "repository"},
    { label: "Factory", bgColor: "bg-[#f6ddcc]", classes: "factory"},
  ];
</script>

<div class="py-1">
  {#each patternsLegend as pattern}
    <div class="flex items-center py-[0.2rem]">
      <p
        class="{`
        ${pattern.bgColor}
        ${pattern.label === 'Bounded Context' ? 'bc' : null}
        w-[90%] px-[0.75rem] pl-4 py-[0.2rem] rounded-md
      `}"
      >
        {pattern.label}
      </p>
    </div>
  {/each}
</div>

<style>
  .bc {
    border: 1px solid black;
    border-style: dashed;
  }
</style>

<script>
  let patternsLegend = [
    { label: "Bounded Context", bgColor: "bg-[#FFFFFF00]", textColor: "text-[#FFFFFF]" },
    { label: "Aggregate", bgColor: "bg-[#d1ece7]", textColor: "text-[#d1ece7]" },
    { label: "Entity", bgColor: "bg-[#fcf3cf]", textColor: "text-[#fcf3cf]" },
    { label: "Value object", bgColor: "bg-[#d9f7a5]", textColor: "text-[#d9f7a5]" },
    { label: "Event", bgColor: "bg-[#f9dd9a]", textColor: "text-[#f9dd9a]" },
    { label: "Command", bgColor: "bg-[#adebff]", textColor: "text-[#adebff]" },
    { label: "Service", bgColor: "bg-[#a3e4d7]", textColor: "text-[#a3e4d7]" },
    { label: "Repository", bgColor: "bg-[#aed6f1]", textColor: "text-[#aed6f1]" },
    { label: "Factory", bgColor: "bg-[#f6ddcc]", textColor: "text-[#f6ddcc]" },
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

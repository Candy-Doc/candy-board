<script lang="ts">
  import patterns from "@Src/tools/Cytoscape/cytoscapeJson/mk-pattern.json";
  import Pattern from "./Pattern.svelte";
  import type { PatternType } from "../../types";

  const patternList: Array<PatternType> = patterns;
  let inputText = "";

  const handleInputChange = ({ target }: Event) => {
    const value = (target as HTMLInputElement).value;
    inputText = value;
  };

  const isSearchElementIncludeIn = (element: PatternType, searchedElement: string) => {
    return element.name.toLowerCase().includes(searchedElement);
  };

  const searchInContent = (
    content: Array<PatternType>,
    searchedElement: string,
    foundElement: Array<PatternType> = []
  ) => {
    content.forEach((element: PatternType) => {
      if (isSearchElementIncludeIn(element, searchedElement)) {
        foundElement.push({ ...element });
      } else {
        if (element.children.length > 0) {
          searchInContent(element.children, searchedElement, foundElement);
        }
      }
    });
    return foundElement;
  };

  const filterSidebarContent = (value: string) => {
    const searchedPatternLowerCase = value.toLowerCase();
    return searchInContent(patternList, searchedPatternLowerCase);
  };

  $: filteredPatterns = filterSidebarContent(inputText);
</script>

<div class="patterns-container">
  <div class="pb-1">
    <candy-input
      on:input="{handleInputChange}"
      value="{inputText}"
      label=""
      shortcut=""
      placeholder="Search pattern..."></candy-input>
  </div>
  {#if filteredPatterns === undefined || filteredPatterns.length === 0}
    <p class="text-center py-4 text-gray-600">No pattern found</p>
  {/if}
  {#each filteredPatterns as pattern}
    <Pattern pattern="{pattern}" on:centerNode on:hideNodeNeighbors />
  {/each}
</div>

<style>
  .patterns-container {
    max-width: 17rem;
  }
</style>

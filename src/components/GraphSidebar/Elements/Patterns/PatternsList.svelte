<script lang="ts">
  import patterns from "@Src/tools/Cytoscape/cytoscapeJson/mk-pattern.json";
  import Pattern from "./Pattern.svelte";

  const patternList = patterns;
  let inputText = "";

  const handleInputChange = ({ target }: Event) => {
    const value = (target as HTMLInputElement).value;
    inputText = value;
  };

  const isSearchElementIncludeIn = (element, searchedElement) => {
    return element.name.toLowerCase().includes(searchedElement);
  };

  const searchInContent = (content, searchedElement, foundElement = []) => {
    content.forEach((element) => {
      if (isSearchElementIncludeIn(element, searchedElement)) {
        foundElement.push({ ...element });
      } else {
        if (element.children.length > 0) {
          searchInContent(element.children, foundElement);
        }
      }
    });
    return foundElement;
  };

  const filterSidebarContent = (value) => {
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
  {#each filteredPatterns as pattern}
    <Pattern pattern="{pattern}" on:centerNode on:hideNodeNeighbors />
  {/each}
</div>

<style>
  .patterns-container {
    max-width: 17rem;
  }
</style>

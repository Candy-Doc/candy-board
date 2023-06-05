<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
  import "@candy-doc/ui/src/components/Button";
  import Arrow from "../assets/Arrow.svg"
</script>

<div class="flex h-full flex-col">
  <h1 class="flex my-16 text-4xl text-[#080042] font-bold justify-center">CONTACT</h1>
  <div class="flex flex-row gap-40 mt-20 m-5 justify-center place-content-center">
    <div class="flex flex-col m-7">
      <div class="relative right-1/2 bottom-1/2 h-0">
        <h2 class="absolute top-0 right-16 text-center font-bold text-[#08004243] text-3xl">Want to join a <br>breathtaking
          PROJECT ?</h2>
        <div class="absolute top-28 left-16">
          <img src="{Arrow}" alt="Github Arrow"/>
        </div>
      </div>
      <div class="flex flex-col items-center gap-10 mt-4">
        <Fa size="10x" style="color: #08004288" icon={faGithub}/>
        <a href="https://github.com/Candy-Doc">
          <candy-button label="Become a contributor"></candy-button>
        </a>
      </div>
    </div>
    <div class="flex flex-col m-7">
      <div class="flex flex-col items-center gap-10 mt-4">
        <Fa size="10x" style="color: #08004288" icon={faDiscord}/>
        <a href="https://discord.gg/7eHxVAXB3B">
          <candy-button id="githubButton" label="Join the community"></candy-button>
        </a>
      </div>
      <div class="relative top-20 left-28 h-0">
        <h2 class="absolute bottom-0 left-44 text-center font-bold text-[#08004243] text-3xl">Want to join a <br>phenomenal
          TEAM ?</h2>
        <div class="absolute bottom-40 left-32 scale-x-125 rotate-180">
          <img src="{Arrow}" alt="Discord Arrow"/>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: Simplicity;
    src: url('../assets/font/simplicity.ttf')
  }

  candy-button::part(button) {
    background-color: #080042;
    box-shadow: 10px 10px 15px #bbb;
    font-size: 20px;
    padding: 20px;
    transition: transform 0.2s ease-in-out;
  }

  candy-button::part(button):hover {
    transform: scale(1.1);
  }

  h2 {
    font-family: Simplicity, sans-serif
  }
</style>





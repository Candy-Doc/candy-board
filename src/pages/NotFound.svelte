<script lang="ts">
    import {navigate} from "svelte-navigator";
    import Fa from "svelte-fa/src/fa.svelte";
    import DashLine from "@Src/assets/DashLine.svg";
    import { faPersonDrowning, faHouseFlag } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="flex h-full flex-col items-center">
    <h1 class="flex mt-24 text-4xl text-[#080042] font-bold justify-center">404 NOT FOUND</h1>
    <h2 class="text-center my-20 font-bold text-[#08004243] text-3xl">As the first time we heard about DDD, <br>you seem lost</h2>
    <candy-button on:click={() => navigate("/")} label="Get back home"></candy-button>
    <div class="relative translate-x-6 mx-5 my-4">
        <Fa class="absolute top-36 -left-20" size="4x" style="color: #08004288" icon={faPersonDrowning}/>
        <div class="-translate-y-8 -rotate-12">
            <img src="{DashLine}" alt="Dashline"/>
        </div>
        <Fa class="absolute top-14 -right-16" size="4x" style="color: #08004288" icon={faHouseFlag}/>
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
        font-family: Simplicity,sans-serif
    }
</style>
<script lang="ts">
    import {navigate} from "svelte-navigator";
    import Fa from "svelte-fa/src/fa.svelte";
    import DashLine from "@Src/assets/DashLine.svelte";
    import { faPersonDrowning, faHouseFlag } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="flex h-full flex-col items-center">
    <h1 class="flex mt-24 text-4xl text-[#080042] font-bold justify-center">404 NOT FOUND</h1>
    <h2 class="text-center my-20 font-bold text-[#08004243] text-3xl">As the first time we heard about DDD, <br>you seem lost</h2>
    <candy-button on:click={() => navigate("/")} label="Get back home"></candy-button>
    <div class="relative w-0 my-4">
        <Fa class="absolute top-36 right-36" size="4x" style="color: #08004288" icon={faPersonDrowning}/>
        <div class="-translate-x-32 -rotate-12">
            <DashLine />
        </div>
        <Fa class="absolute top-14 left-36" size="4x" style="color: #08004288" icon={faHouseFlag}/>
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
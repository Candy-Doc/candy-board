<script lang="ts">
  import DocSidebar from "@Src/components/DocSidebar/DocSidebar.svelte";
  import MarkdownIt from "markdown-it";
  import MarkdownItAnchor from "markdown-it-anchor";
  import { onDestroy, onMount } from "svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

  import type { SidebarItem } from "@Src/components/DocSidebar/SidebarItemTypes";
  import { ElementType } from "@Src/components/DocSidebar/SidebarItemTypes";
  import Arrow from "../assets/Arrow.svg";
  import "../styles/home.css";

  const MARKDOWN_DIRECTORY_PATH = "markdown/";
  const MARKDOWN_FILENAMES = ["GETTING_STARTED.md", "DDD.md"];

  type HtmlTitle = {
    tokenContent: string;
    innerText: string;
  };

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  md.use(MarkdownItAnchor);

  let pageContent: string;
  let hideAccessToGraph = false;
  let summary: Array<SidebarItem> = [];

  onMount(() => {
    generatePageContent();
    handleEvents();
  });

  onDestroy(() => {
    removeEvents();
  });

  const generatePageContent = async () => {
    const htmlContents = MARKDOWN_FILENAMES.map((fileName) =>
      GetMarkdownContent(window.location.pathname, MARKDOWN_DIRECTORY_PATH + fileName).then(
        (mdContent) => md.render(mdContent)
      )
    );

    pageContent = (await Promise.all(htmlContents)).reduce(
      (acc, htmlContent) => acc + htmlContent,
      ""
    );

    pageContent = updateDddLink(pageContent);
    getIds(pageContent);
  };

  const GetMarkdownContent = async (baseurl: string, path: string) => {
    const file = await fetch(baseurl + path);
    return file.ok ? await file.text() : "";
  };

  const updateDddLink = (content: string) => {
    content = content.replace('href="DDD.md"', 'href="#domain-driven-design-(ddd)" class="link"');
    return content;
  };

  const getIds = (content: string) => {
    const inlineParse = md.parseInline(content, {});
    const storeHtmlInlineAndInnerHtml: Array<HtmlTitle> = [];
    const children = inlineParse[0].children;
    if (children) {
      children.forEach((token, index) => {
        if (
          token.type === "html_inline" &&
          token.content.includes("id=") &&
          index < children.length - 1
        ) {
          storeHtmlInlineAndInnerHtml.push({
            tokenContent: token.content,
            innerText: children[index + 1].content,
          });
        }
      });
    }
    summary = mapHtmlTitleToSideBarItem(storeHtmlInlineAndInnerHtml);
  };

  const extractTag = (htmlTitle: HtmlTitle) => {
    let id = htmlTitle.tokenContent.split("tabindex")[0];
    let tag = id.split("id=")[0].replace("<", "").trim();
    id = id.split("id=")[1];
    id = id.replaceAll('"', "").trim();
    return [tag, id];
  };

  const mapHtmlTitleToSideBarItem = (htmlTitles: Array<HtmlTitle>) => {
    const sideBar: Array<SidebarItem> = [];
    htmlTitles.forEach((htmlTitle) => {
      const htmlInfo = extractTag(htmlTitle);
      switch (htmlInfo[0]) {
        case "h1": {
          sideBar.push({...createTitle(ElementType.TITLE, htmlInfo[1], htmlTitle.innerText), summary:[]});
          break;
        }
        case "h2": {
          const lastTitle = sideBar.pop();
          if (lastTitle) {
            lastTitle.summary?.push(createTitle(ElementType.ELEMENT, htmlInfo[1], htmlTitle.innerText));
            sideBar.push(lastTitle);
          }
          break;
        }
        case "h3": {
          const lastTitle = sideBar.pop();
          if (lastTitle) {
            lastTitle.summary?.push(createTitle(ElementType.ELEMENT, htmlInfo[1], htmlTitle.innerText));
            sideBar.push(lastTitle);
          }
          break;
        }
      }
    });
    return sideBar;
  };

  const createTitle = (type: ElementType, htmlId: string, label: string) => {
    return {
      type: type,
      id: htmlId,
      label: label,
    };
  }

  const handleEvents = () => {
    document.getElementById("toTopButton")?.addEventListener("click", scrollTop);
    window.addEventListener("resize", displayAccessToGraph);
  };

  const removeEvents = () => {
    document.getElementById("toTopButton")?.removeEventListener("click", scrollTop)
    window.removeEventListener("resize", displayAccessToGraph);
  };

  const scrollTop = () => {
    scrollTo({
      top: 0,
    });
  }

  const displayAccessToGraph = () => {
    hideAccessToGraph = window.innerWidth < 768;
  };
</script>

<div class="flex h-full">
  <DocSidebar summary="{summary}" />
  <section class="home grow bg-white rounded-xl shadow-lg flex justify-center">
    <div class="{hideAccessToGraph ? 'hidden' : ''}">
      <div class="absolute top-14 right-56 -scale-x-75 rotate-90">
        <img src="{Arrow}" alt="Discord Arrow" />
      </div>
      <p
        class="handwritten absolute top-24 right-20 text-center font-bold text-[#08004243] text-2xl"
      >
        Access to your<br />graph HERE
      </p>
    </div>
    <div class="flex flex-col max-w-screen-lg	mx-20 my-10 text-[#000000DD] text-justify">
      {@html pageContent}
      <candy-floating-button
        id="toTopButton"
        size="md"
        color="#080042"
        position="br"
        anchor="window"
        xPadding="30"
        yPadding="30"
      >
        <span slot="icon" class="flex flex-col">
          <Fa icon="{faArrowUp}" />
        </span>
      </candy-floating-button>
    </div>
  </section>
</div>

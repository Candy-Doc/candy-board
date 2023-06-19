<script lang="ts">
  import DocSidebar from "@Src/components/DocSidebar/DocSidebar.svelte";
  import MarkdownIt from "markdown-it";
  import MarkdownItAnchor from "markdown-it-anchor";
  import {onMount} from "svelte";
  import type {SidebarItem} from "@Src/components/DocSidebar/SidebarItemTypes";
  import {ElementType} from "@Src/components/DocSidebar/SidebarItemTypes";

  import Arrow from "../assets/Arrow.svg";
  import "../styles/home.css";

  export type HtmlTitle = {
    tokenContent: string,
    innerText: string
  }

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  md.use(MarkdownItAnchor);

  let finalPage: string;

  let summary : Array<SidebarItem> = [];

  onMount(async () => {
    const mdGettingStarted = await GetReadmeContent(window.location.pathname, "src/markdown/GETTING_STARTED.md");
    const mdDdd = await GetReadmeContent(window.location.pathname, "src/markdown/DDD.md")
    if (mdGettingStarted && mdDdd) {
      const htmlGettingStarted = md.render(mdGettingStarted);
      const htmlDdd = md.render(mdDdd);
      finalPage = htmlGettingStarted?.concat(htmlDdd);
      finalPage = updateDddLink(finalPage);
      getIds(finalPage);
    }
  });

  const GetReadmeContent = async (baseurl: string, path: string) => {
    const file = await fetch(baseurl + path);
    return file.ok ? await file.text() : undefined;
  };

  const updateDddLink = (content: string) => {
    content = content.replace("href=\"DDD.md\"", "href=\"#domain-driven-design-(ddd)\"")
    return content
  }

  const getIds = (content: string | undefined) => {
    const inlineParse = md.parseInline(content, {});
    const storeHtmlInlineAndInnerHtml: Array<HtmlTitle> = []
    inlineParse[0].children?.forEach((token, index) => {
      if(token.type === 'html_inline' && token.content.includes('id=') && index < inlineParse[0].children.length - 1) {
        storeHtmlInlineAndInnerHtml.push({tokenContent: token.content, innerText: inlineParse[0].children[index + 1].content})
      }
    })
    summary = mapHtmlTitleToSideBarItem(storeHtmlInlineAndInnerHtml);
  };

  const extractTag = (htmlTitle: HtmlTitle) => {
    let id = htmlTitle.tokenContent.split("tabindex")[0];
    let tag = id.split("id=")[0].replace("<", "").trim();
    id = id.split("id=")[1];
    id = id.replaceAll('"', "").trim();
    return [tag,id];
  }

  const mapHtmlTitleToSideBarItem = (htmlTitles: Array<HtmlTitle>) => {
    const sideBar: Array<SidebarItem> = [];
    htmlTitles.map((htmlTitle) => {
      console.log(sideBar)
      const htmlInfo = extractTag(htmlTitle)
      switch (htmlInfo[0]) {
        case 'h1': {
          sideBar.push({type: ElementType.TITLE, id: htmlInfo[1], label: htmlTitle.innerText, summary: []});
          break;
        }
        case 'h2': {
          const lastTitle = sideBar.pop();
          if(lastTitle) {
            lastTitle.summary?.push({type: ElementType.ELEMENT, id: htmlInfo[1], label: htmlTitle.innerText});
            sideBar.push(lastTitle);
          }
          break;
        }
        case 'h3': {
          const lastTitle = sideBar.pop();
          if(lastTitle) {
            lastTitle.summary?.push({type: ElementType.SUBELEMENT, id: htmlInfo[1], label: htmlTitle.innerText});
            sideBar.push(lastTitle);
          }
          break;
        }
      }
    })
    return sideBar;
  }
</script>

<div class="flex h-full">
  <DocSidebar summary={summary}/>
  <div class="home prose grow bg-white rounded-xl shadow-lg">
    <div class="absolute top-14 right-56 -scale-x-75 rotate-90">
      <img src="{Arrow}" alt="Discord Arrow" />
    </div>
    <p class="handwritten absolute top-24 right-20 text-center font-bold text-[#08004243] text-2xl">
      Access to your<br>graph HERE
    </p>
    <div class="flex flex-col mx-20 my-10 text-[#000000DD]">
      {@html finalPage}
    </div>
  </div>
</div>

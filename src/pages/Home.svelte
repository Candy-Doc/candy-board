<script lang="ts">
  import DocSidebar from "@Src/components/DocSidebar/DocSidebar.svelte";
  import MarkdownIt from "markdown-it";
  import MarkdownItAnchor from "markdown-it-anchor";
  import {onMount} from "svelte";
  import type {SidebarItem} from "@Src/components/DocSidebar/SidebarItemTypes";
  import {ElementType} from "@Src/components/DocSidebar/SidebarItemTypes";
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
  let mdContent: string | undefined = undefined;

  let summary : Array<SidebarItem> = [];

  onMount(async () => {
    const fileContent = await GetReadmeContent(window.location.pathname, "src/markdown/GETTING_STARTED.md");
    if (fileContent !== undefined) {
      mdContent = md.render(fileContent);
      getIds(mdContent);
      // mdContent = mdContent?.replace('<h1', '<h1 style="color:red;"');
      // console.log(mdContent)
    }
  });

  const GetReadmeContent = async (baseurl: string, path: string) => {
    const file = await fetch(baseurl + path);
    return file.ok ? await file.text() : undefined;
  };

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
    <div class="flex flex-col mx-20 my-10 text-[#000000DD]">
      {@html mdContent}
    </div>
  </div>
</div>


<style>
    h1 {
        color: #080042;
        display: flex;
        justify-content: center;
        font-size: 2rem !important;
        padding: 2rem 0 !important;
    }

    h2 {
        color: #080042EE;
        font-size: 1.5rem !important;
        padding-top: 3rem !important;

    }

    h3 {
        color: #080042DD;
        font-size: 1.3rem !important;
        padding-top: 2rem !important;
    }

    p {
        padding: 0.5rem 0 !important
    }

    ul {
        list-style-type: disc !important;
        list-style-position: outside !important;
        padding-left: 3rem !important;
    }

    li {
        padding-left: 0.5rem;
    }

</style>
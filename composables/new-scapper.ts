export const useNewScapper = (url: string) => {
  const config = useRuntimeConfig();

  let content = {
    main: null as Element | null,
    p: [] as HTMLParagraphElement[],
    img: [] as HTMLImageElement[],
    iframe: [] as HTMLIFrameElement[],
  };

  return new Promise((resolve, reject) => {
    fetch(config.corsApi + url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(data, "text/html");
        let mainContainer = htmlDoc.querySelector("#maincontent");
        mainContainer?.querySelectorAll("img").forEach((img) => {
          img.setAttribute(
            "src",
            "https://cdn.animenewsnetwork.com/" + img.getAttribute("data-src")
          );
        });
        mainContainer?.querySelector("#social-bookmarks")?.remove();
        mainContainer?.querySelectorAll("script").forEach((script) => {
          script.remove();
        });
        mainContainer?.querySelectorAll("a").forEach((a) => {
          a.classList.add("text-blue-400");
          a.classList.add("underline");
        });
        content.main = mainContainer;
        resolve(content);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

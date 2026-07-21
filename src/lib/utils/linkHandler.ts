export function handleLinkWithFallback(primary: string, fallback: string) {
  const win = window.open("about:blank", "_blank");
  const img = new Image();
  let done = false;

  const finish = (url: string) => {
    if (done) return;
    done = true;
    if (win) win.location.href = url;
  };

  const origin = new URL(primary).origin;
  img.onload = () => finish(primary);
  img.onerror = () => finish(fallback);
  img.src = `${origin}/favicon.ico?_=${Date.now()}`;
  setTimeout(() => finish(fallback), 2500);
}

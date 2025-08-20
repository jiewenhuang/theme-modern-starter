import "./styles/tailwind.css";
import "./styles/main.css";
import Alpine from "alpinejs";
import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupPreloadPlugin from "@swup/preload-plugin";
import SwupScrollPlugin from "@swup/scroll-plugin";
import SwupScriptsPlugin from "@swup/scripts-plugin";

import { mountCounter } from "./preact";

window.Alpine = Alpine;
const swup = new Swup({
  plugins: [
    new SwupHeadPlugin({ persistAssets: true }),
    new SwupPreloadPlugin(),
    new SwupScrollPlugin(),
    new SwupScriptsPlugin({
      head: false,
      body: true,
    }),
  ],
  containers: ["#swup"],
});

Alpine.start();

export function count(x: number, y: number) {
  return x + y;
}
function mountWidgets() {
  console.log("Mounting widgets...");
  const counterContainer = document.querySelector("#counter");
  if (counterContainer) {
    mountCounter(counterContainer as HTMLElement);
  }
}
swup.hooks.on("visit:start", () => {
  console.log(window.location.href);
});
swup.hooks.on("content:replace", () => {
  console.log("Content replaced");
  // mountWidgets();
});

// 页面初始加载
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  mountWidgets();
});

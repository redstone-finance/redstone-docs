window.addEventListener("load", function(){
  manageSidebarBasedOnUrlParams();
});

function manageSidebarBasedOnUrlParams() {
  if (window.location.href.includes("running-oracle-node")) {
    // Collapsing smart contract devs section, which is expanded by default
    document.querySelector("button[aria-label*='Smart Contract Devs']").click();
  }
}

const stats = document.querySelectorAll(".stats .stat");
const buttons = [...document.querySelectorAll(".timeframes .btn")];

let data = null;

fetch("../data.json")
  .then((rep) => rep.json())
  .then((json) => {
    data = json;

    const activeTimeFrame = buttons.find((btn) =>
      btn.classList.contains("active")
    ).dataset.timeframe;

    showCards(activeTimeFrame);
  });

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    showCards(this.dataset.timeframe);
  });
});

function showCards(timeframe) {
  console.log("running");
  let innerhtml = "";
  data.forEach((activity) => {
    const { title, timeframes } = activity;
    const { current, previous } = timeframes[timeframe];

    let prevText = "";

    switch (timeframe) {
      case "daily":
        prevText = "yesterday";
        break;

      case "weekly":
        prevText = "last week";
        break;

      case "monthly":
        prevText = "monthly";
        break;

      default:
        prevText = "previous";
    }

    let className = title.replace(/ /g, "-").toLowerCase();

    innerhtml += `
      <div class="card ${className}">
        <div class="bg-box rounded-corners"></div>
        <div class="content rounded-corners">
          <header class="header">
            <h2 class="heading">${title}</h2>
            <svg class="ellipsis" xmlns="http://www.w3.org/2000/svg" width="21" height="5"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
          </header>
          <div class="stats">
            <div class="stat current">${current}hrs</div>
            <div class="stat previous">${prevText} - ${previous}hrs</div>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById("data").innerHTML = innerhtml;
}

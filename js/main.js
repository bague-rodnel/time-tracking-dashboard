const stats = document.querySelectorAll(".stats .stat");
const buttons = [...document.querySelectorAll(".timeframes .btn")];
const activeTimeFrame = buttons.find((btn) => btn.classList.contains("active"))
  .dataset.timeframe;

showCards(activeTimeFrame);

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    // console.log(this.dataset.timeframe);
    showCards(this.dataset.timeframe);
  });
});

function showCards(timeframe) {
  stats.forEach((stat) => {
    console.log(stat.classList.contains(timeframe));

    if (stat.classList.contains(timeframe)) {
      stat.style.display = "block";
    } else {
      stat.style.display = "none";
    }
  });
}

console.log(data);

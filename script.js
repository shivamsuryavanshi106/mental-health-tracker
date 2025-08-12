let selectedMood = "";
const moodButtons = document.querySelectorAll(".mood-btn");
const saveBtn = document.getElementById("saveBtn");
const journalInput = document.getElementById("journal");
const moodChart = document.getElementById("moodChart");

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMood = btn.dataset.mood;
    moodButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

saveBtn.addEventListener("click", () => {
  if (!selectedMood) {
    alert("Please select a mood!");
    return;
  }

  const entry = {
    mood: selectedMood,
    journal: journalInput.value,
    date: new Date().toLocaleDateString()
  };

  let history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.push(entry);
  localStorage.setItem("moodHistory", JSON.stringify(history));

  journalInput.value = "";
  selectedMood = "";
  moodButtons.forEach(b => b.classList.remove("selected"));
  renderChart();
});

function renderChart() {
  moodChart.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

  history.forEach(entry => {
    const box = document.createElement("div");
    box.classList.add("mood-box", entry.mood);
    box.title = `${entry.date}: ${entry.mood}\nNote: ${entry.journal}`;
    moodChart.appendChild(box);
  });
}


renderChart();

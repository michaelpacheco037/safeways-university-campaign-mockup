// Check all three quiz questions without submitting anything to a server.
const quizForm = document.querySelector("#quiz-form");

if (quizForm) {
  const quizCards = quizForm.querySelectorAll(".quiz-card");
  const quizResult = document.querySelector("#quiz-result");
  document.querySelector("#quiz-actions").hidden = false;

  function clearFeedback(card) {
    card.classList.remove("is-correct", "needs-review");
    card.querySelector(".feedback").textContent = "";
  }

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let correctCount = 0;
    let firstUnanswered = null;

    quizCards.forEach((card) => {
      clearFeedback(card);
      const selected = card.querySelector("input:checked");
      const feedback = card.querySelector(".feedback");

      if (!selected) {
        feedback.textContent = "Choose an answer for this question.";
        card.classList.add("needs-review");
        if (!firstUnanswered) firstUnanswered = card.querySelector("input");
        return;
      }

      if (selected.value === card.dataset.answer) {
        correctCount++;
        card.classList.add("is-correct");
        feedback.textContent = "Correct. " + card.dataset.explanation;
      } else {
        card.classList.add("needs-review");
        feedback.textContent = "Not quite. " + card.dataset.explanation;
      }
    });

    if (firstUnanswered) {
      quizResult.textContent = "Choose an answer for every question, then check again. Your completed answers have feedback below each question.";
      firstUnanswered.focus();
    } else {
      quizResult.textContent = correctCount + " of " + quizCards.length + " correct. " +
        (correctCount === quizCards.length
          ? "Nicely done! Keep these habits in mind on your next trip."
          : "Read the explanations below each question, then try again.");
    }
  });

  // Clear an old result when an answer changes, so feedback stays accurate.
  quizCards.forEach((card) => {
    card.addEventListener("change", () => {
      clearFeedback(card);
      quizResult.textContent = "Answers updated. Check them when you’re ready.";
    });
  });

  quizForm.addEventListener("reset", () => {
    quizCards.forEach(clearFeedback);
    quizResult.textContent = "Quiz reset. Choose one answer for each question.";
  });
}

// Count the habits selected in the pre-drive checklist.
const checklist = document.querySelector(".drive-checklist");

if (checklist) {
  const checklistInputs = checklist.querySelectorAll("input");
  const checklistStatus = document.querySelector("#checklist-status");
  checklistStatus.hidden = false;

  function updateChecklist() {
    const selectedCount = checklist.querySelectorAll("input:checked").length;
    checklistStatus.textContent = selectedCount + " of " + checklistInputs.length + " habits planned." +
      (selectedCount === checklistInputs.length ? " Keep your focus on the road." : "");
  }

  checklist.addEventListener("change", updateChecklist);
  updateChecklist();
}

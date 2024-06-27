document.getElementById("submit_btn").addEventListener("click", function () {
  const responses = [];
  document.querySelectorAll(".question-input").forEach((input) => {
    const questionId = input.getAttribute("data-question-id");
    const aspect = input.getAttribute("data-aspect");
    const value = input.value;
    responses.push({ questionId, aspect, value });
  });

  fetch("https://meme-survey-app-929d134b2578.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ responses }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("問卷已成功提交，謝謝!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("提交失敗，請重試。");
    });
});

console.log("loaded");

function deleteMessage(e) {
  console.log("clicked", e.target);
  var confirmed = window.confirm(
    "Are you sure you want to delete this message?"
  );
  if (confirmed) {
    const url = "http://localhost:3000/message/" + e.target.id;
    console.log(url);

    fetch(url, { method: "DELETE" });
  }
  location.reload();
}

var buttons = document.querySelectorAll(".delete-msg-bttn");

buttons.forEach((bttn) => bttn.addEventListener("click", deleteMessage));

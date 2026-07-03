
let cart = [];

function addItem(name, price) {
  cart.push({name, price});
  updateCart();
  alert(name + " added to cart!");
}

function updateCart() {
  let user = localStorage.getItem("mc_user");

  let text =
`🎫 STORE PURCHASE REQUEST

👤 IGN: ${user}

🛒 ITEMS:`;

  let total = 0;

  cart.forEach(item => {
    text += `\n- ${item.name} (${item.price})`;

    let priceNum = parseInt(item.price.replace(/[^0-9]/g, ""));
    if (!isNaN(priceNum)) total += priceNum;
  });

  text += `\n\n💰 TOTAL: ${total}
📌 Send this in Discord ticket`;

  document.getElementById("ticketBox").value = text;
}

function copyTicket() {
  let t = document.getElementById("ticketBox");
  t.select();
  document.execCommand("copy");
  alert("Ticket copied!");
}
let lastClick = 0;

function rateLimit() {
  let now = Date.now();
  if (now - lastClick < 1000) {
    return false; // block spam clicks
  }
  lastClick = now;
  return true;
}
let loginAttempts = 0;

function login() {
  if (loginAttempts >= 5) {
    alert("Too many attempts. Wait 1 minute.");
    return;
  }

  let name = document.getElementById("loginName").value;
  let pass = document.getElementById("loginPass").value;

  let savedName = localStorage.getItem("mc_user");
  let savedPass = localStorage.getItem("mc_pass");

  if (name === savedName && pass === savedPass) {
    loginAttempts = 0;
    localStorage.setItem("mc_logged", "true");
    alert("Welcome " + name);
    closeLogin();
  } else {
    loginAttempts++;
    alert("Wrong login");
  }
}
document.addEventListener("keydown", function(e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I")
  ) {
    alert("Developer tools blocked");
    e.preventDefault();
  }
});
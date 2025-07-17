// Player stats
let stats = {
  health: 100,
  firewall: 5,
  antivirus: false,
  money: 100,
  score: 0
};

// Attack types and correct actions
const attacks = [
  {
    name: "Phishing",
    desc: "Suspicious email detected!",
    correctAction: "Verify Email",
    wrongEffect: () => { stats.health -= 15; }
  },
  {
    name: "Ransomware",
    desc: "Files are being encrypted!",
    correctAction: "Restore Backup",
    wrongEffect: () => { stats.health -= 20; }
  },
  {
    name: "DDoS",
    desc: "Server under traffic flood!",
    correctAction: "Block IPs",
    wrongEffect: () => { stats.firewall = Math.max(1, stats.firewall - 1); }
  },
  {
    name: "Malware",
    desc: "Suspicious process found!",
    correctAction: "Run Antivirus",
    wrongEffect: () => { stats.health -= 10; }
  }
];

// Update stats on screen
function updateStats() {
  document.getElementById("health").textContent = `Health: ${'█'.repeat(stats.health / 10)} ${stats.health}%`;
  document.getElementById("firewall").textContent = `Firewall: Level ${stats.firewall}`;
  document.getElementById("money").textContent = `Money: 💰 $${stats.money}`;
}

// Generate a new attack
function generateAttack() {
  const attack = attacks[Math.floor(Math.random() * attacks.length)];
  document.getElementById("attack").innerHTML = `<h3>💥 INCOMING ATTACK: ${attack.name}</h3><p>${attack.desc}</p>`;

  // Generate 4 actions (1 correct, 3 random)
  let options = [attack.correctAction];
  while (options.length < 4) {
    const randomAction = attacks[Math.floor(Math.random() * attacks.length)].correctAction;
    if (!options.includes(randomAction)) {
      options.push(randomAction);
    }
  }
  options = options.sort(() => 0.5 - Math.random()); // Shuffle

  // Update buttons
  for (let i = 0; i < 4; i++) {
    document.querySelectorAll(".choices button")[i].textContent = options[i];
    document.querySelectorAll(".choices button")[i].dataset.correct = (options[i] === attack.correctAction);
  }
}

// Handle action selection
function chooseAction(choice) {
  const selected = document.querySelectorAll(".choices button")[choice - 1];
  const isCorrect = selected.dataset.correct === "true";

  if (isCorrect) {
    stats.money += 20;
    stats.score += 1;
    document.getElementById("attack").innerHTML = `<p class="success">✅ Threat neutralized!</p>`;
  } else {
    const attackName = document.getElementById("attack").querySelector("h3").textContent.split(": ")[1];
    const attackObj = attacks.find(a => a.name === attackName);
    attackObj.wrongEffect();
    document.getElementById("attack").innerHTML = `<p class="danger">❌ Wrong action! Systems compromised!</p>`;
  }

  updateStats();
  setTimeout(generateAttack, 1500);
}

// Upgrade Firewall
function upgradeFirewall() {
  if (stats.money >= 30) {
    stats.firewall += 1;
    stats.money -= 30;
    updateStats();
  } else {
    alert("Not enough money!");
  }
}

// Enable Antivirus
function enableAntivirus() {
  if (stats.money >= 50) {
    stats.antivirus = true;
    stats.money -= 50;
    updateStats();
  } else {
    alert("Not enough money!");
  }
}

// Start the game
updateStats();
generateAttack();


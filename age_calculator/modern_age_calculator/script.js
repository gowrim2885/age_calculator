function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const resultDiv = document.getElementById("result");
  const extraDiv = document.getElementById("extraInfo");

  if (!dobInput) {
    resultDiv.innerHTML = "❗ Please select your Date of Birth.";
    extraDiv.innerHTML = "";
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    resultDiv.innerHTML = "❌ You cannot be born in the future!";
    extraDiv.innerHTML = "";
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultDiv.innerHTML = `
    <strong>Your Age:</strong><br> 
    🧓 ${years} years, ${months} months, ${days} days
  `;

  // Extra Features
  // 1. Next Birthday
  let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday < today) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }
  const daysToBday = Math.floor((nextBday - today) / (1000 * 60 * 60 * 24));

  // 2. Zodiac Sign
  const zodiac = getZodiacSign(dob.getDate(), dob.getMonth() + 1);

  // 3. Age Category
  const category =
    years < 13 ? "Child" :
    years < 20 ? "Teen" :
    years < 60 ? "Adult" :
    "Senior";

  // 4. Total Days, Weeks, Hours
  const diff = today - dob;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  // 5. Day of the Week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bornDay = daysOfWeek[dob.getDay()];

  extraDiv.innerHTML = `
    <hr>
    🎉 <strong>Next Birthday:</strong> ${nextBday.toDateString()} (${daysToBday} days left)<br>
    🌟 <strong>Zodiac Sign:</strong> ${zodiac}<br>
    🧑 <strong>Age Category:</strong> ${category}<br>
    ⏳ <strong>Total Days Lived:</strong> ${totalDays}<br>
    📅 <strong>Total Weeks Lived:</strong> ${totalWeeks}<br>
    🕒 <strong>Total Hours Lived:</strong> ${totalHours}<br>
    📌 <strong>You were born on:</strong> ${bornDay}
  `;
}

function getZodiacSign(day, month) {
  const signs = [
    ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20],
    ["Aries", 19], ["Taurus", 20], ["Gemini", 20],
    ["Cancer", 22], ["Leo", 22], ["Virgo", 22],
    ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21], ["Capricorn", 31]
  ];
  return day <= signs[month - 1][1] ? signs[month - 1][0] : signs[month][0];
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function maskPassword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}
function copyText(txt) {
  let a = prompt("Enter a PIN to copy details.");
  if (a === "220701") {
    navigator.clipboard.writeText(txt).then(
      () => {
        //clipboard successfully set
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      },
      () => {
        //clipboard write failed
        alert("failed");
      },
    );
  }
}

const deletePassword = (accounttype) => {
  let a = prompt("Enter a PIN to copy details.");
  if (a === "220701") {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
      return e.accounttype != accounttype;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${accounttype}'s password`);
    showPasswords();
  }
};
//logic to fill the table
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");

  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = `<tr><td class="no-data">No Data To Show</td></tr>`;
  } else {
    tb.innerHTML = `<tr>
                <th>Account Type</th>
                <th>Username</th>
                <th>Passwords</th>
                <th>Actions</th>
                </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
      <td>${element.accounttype} <img onclick="copyText('${element.accounttype}')" src="./copy.svg" width="20" height="20" class="copy-icon"></td>
      <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" width="20" height="20" class="copy-icon"></td>
      <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" width="20" height="20" class="copy-icon"></td>
      <td><button class="btnsm" onclick="deletePassword('${element.accounttype}')">Delete</button></td>
      </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  accounttype.value = "";
  username.value = "";
  password.value = "";
};
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  let passwords = localStorage.getItem("passwords");
  if (passwords == null) {
    let json = [];
    json.push({
      accounttype: accounttype.value,
      username: username.value,
      password: password.value,
    });
    alert("Password saved successfully!");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      accounttype: accounttype.value,
      username: username.value,
      password: password.value,
    });
    alert("password saved successfully!");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});

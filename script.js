let form = document.getElementById('form');
let form1 = document.getElementById('form1');
let dataBox = document.getElementById('dataBox');
let dataBox1 = document.getElementById('dataBox2');
let checkboxes = document.querySelectorAll('input[name="tabCheckbox"]');
let checkboxes1 = document.querySelectorAll('input[name="tabCheckbox1"]');

function showTab(tab) {
  let buyTab = document.getElementById('buyTab');
  let sellTab = document.getElementById('sellTab');
  let buyButton = document.getElementById('buyButton');
  let sellButton = document.getElementById('sellButton');

  if (tab === 'buy') {
    buyTab.classList.add('active');
    sellTab.classList.remove('active');
    buyButton.disabled = true;
    sellButton.disabled = false;
  } else if (tab === 'sell') {
    buyTab.classList.remove('active');
    sellTab.classList.add('active');
    buyButton.disabled = false;
    sellButton.disabled = true;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;

  let startDateObj = new Date(startDate);
  let endDateObj = new Date(endDate);
  let currentDate = new Date();

  if (endDateObj < startDateObj || endDateObj > currentDate) {
    alert('Invalid end date. Please select an end date that is greater than the start date');
    return;
  }

  let startDateFormatted = formatDate(startDate);
  let endDateFormatted = formatDate(endDate);
  let selectedTab = '';

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedTab = checkbox.value;
    }
  });

  fetch("https://asia-south1-dacby-database.cloudfunctions.net/AnalyticData/BuyOrder", {
    method: 'POST',
    body: JSON.stringify({
      "Date1": startDateFormatted,
      "Date2": endDateFormatted,
      "Tab": selectedTab
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     
      dataBox.innerHTML = "Total Orders: " + data["Total orders"] + "<br>" + `   Date Range: ${startDateFormatted} to ${endDateFormatted}`;
    })
    .catch((error) => {
      console.error(error);
    });
});

form1.addEventListener('submit', (e) => {
  e.preventDefault();
  let startDate1 = document.getElementById('startDate1').value;
  let endDate1 = document.getElementById('endDate1').value;

 
  let startDateObj1 = new Date(startDate1);
  let endDateObj1 = new Date(endDate1);
  let currentDate = new Date();

  if (endDateObj1 < startDateObj1 || endDateObj1 > currentDate) {
    alert('Invalid end date. Please select an end date that is greater than the start date ');
    return;
  }

  
  let startDateFormatted1 = formatDate(startDate1);
  let endDateFormatted1 = formatDate(endDate1);
  let tab = '';

  checkboxes1.forEach((checkbox) => {
    if (checkbox.checked) {
      tab = checkbox.value;
    }
  });

  fetch("https://asia-south1-dacby-database.cloudfunctions.net/AnalyticData/SellOrder", {
    method: 'POST',
    body: JSON.stringify({
      "Date1": startDateFormatted1,
      "Date2": endDateFormatted1,
      "Tab": tab
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        if(tab=="Inventory")
        {
        dataBox1.innerHTML = "Total Games: " + data["Total Games"] + "<br>"+  "  Total Controllers: " + data["Total Controllers"] + "<br>"+     "  Total Consoles: " + data["Total Consoles"] + "<br>"+ `  Date Range: ${startDateFormatted1} to ${endDateFormatted1}`;
        }
        else
        {
            dataBox1.innerHTML = "Total Orders: " + data["Total orders"];
        } })
    .catch((error) => {
      console.error(error);
    });
});

// function formatDate(dateString) {
//   const [year, month, day] = dateString.split('-');
//   return `${day}-${month}-${year}`;
// }

















    let checkboxes2 = document.querySelectorAll('input[name="tabCheckbox"]');
checkboxes2.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        checkboxes2.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});




let checkboxesss = document.querySelectorAll('input[name="tabCheckbox1"]');
checkboxesss.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        checkboxesss.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});


    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }


    window.addEventListener("DOMContentLoaded", function() {
        var currentDate = new Date().toISOString().split("T")[0];
        var startDateInputs = document.querySelectorAll("input[type=date]");
        
        for (var i = 0; i < startDateInputs.length; i++) {
          startDateInputs[i].setAttribute("max", currentDate);
        }
      });
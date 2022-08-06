var request = new XMLHttpRequest();
request.open("GET", "../data.json", false);
request.send(null);
var parsed = JSON.parse(request.responseText);

const days = [];
const amounts = [];

for (const data of parsed) {
  days.push(data.day);
  amounts.push(data.amount);
}

function titleToolTip(tooltipItems) {
  return "";
}

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: days,
    datasets: [
      {
        data: amounts,
        backgroundColor: "hsl(10, 79%, 65%)",
        borderRadius: "5",
        hoverBackgroundColor: "#ef927f",
      },
    ],
  },
  options: {
    onClick: function clickHandler(click) {
      const points = myChart.getElementsAtEventForMode(
        click,
        "nearest",
        { intersect: true },
        true
      );
      points[0].element.options.backgroundColor = "hsl(186, 34%, 60%)";
    },
    onHover: function (event, chartELement) {
      if (chartELement.length === 1) {
        event.native.target.style.cursor = "pointer";
      } else if (chartELement.length === 0) {
        event.native.target.style.cursor = "default";
      }
    },
    plugins: {
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          title: titleToolTip,
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  },
});
Chart.defaults.font.size = 13;
Chart.defaults.font.family = '"DM Sans", sans-serif';

// function clickHandler(click) {
//   const points = myChart.getElementsAtEventForMode(
//     click,
//     "nearest",
//     { intersect: true },
//     true
//   );

//   points[0].element.options.backgroundColor = "black";
//   points[0].element.options.hoverBackgroundColor = "black";
// }

// ctx.onclick = clickHandler;
// myChart.data.datasets[points[0].datasetIndex].hoverBackgroundColor = "black";

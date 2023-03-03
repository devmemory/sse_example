import util from "../../util/util";

export const chartType = Object.freeze({
    line: 'line',
    bar: 'bar',
    radar: 'radar',
    pie: 'pie',
    polarArea: 'polarArea',
    bubble: 'bubble',
    scatter: 'scatter',
});

export default class CustomChart {
    constructor({ chartTitle, type, data }) {
        this.chartTitle = chartTitle;

        this.type = type ?? chartType.bar;

        this.data = data ?? { labels, data };

        this.chartColors = this._setColor();

        this.chartjs = util.checkScript("chart.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js", () => {
                this._setChart();
            });
    }

    updateChart(data) {
        const chartData = this.myChart.data.datasets[0].data;
        chartData.push(data);
        this.myChart.data.labels.push(chartData.length);

        this.myChart.update();
    }

    // chart config
    _setChart() {
        const config = {
            type: this.type,
            data: {
                labels: this.data.labels,
                datasets: [
                    {
                        label: this.chartTitle,
                        data: this.data.data,
                        backgroundColor: this.chartColors.backgroundColor,
                        borderColor: this.chartColors.borderColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                    }
                },
            }
        };

        const div = document.getElementById("div_chart");

        const canvas = document.createElement("canvas");

        div.appendChild(canvas);

        console.log({ div, canvas });

        this.myChart = new Chart(canvas, config);
    }

    // line일 때 단색 처리 이외에는 색깔로
    _setColor() {
        if (this.type === chartType.line) {
            return {
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)"
                ],
            };
        }

        return {
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
        };
    }

    // remove script
    dispose() {
        util.removeScript(this.chartjs);
    }
}
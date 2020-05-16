document.addEventListener('turbolinks:load', () => ) {
    // 日付の古い方・新しい方を取得する関数
    const minDate = (date1, date2) => (date1 < date2) ? date1 : date2
    const maxDate = (date1, date2) => (date1 > date2) ? date1 : date2

    // データの初日・最終日
    const START_DATE = convertDate(gon.weight_records[0].date)
    const END_DATE = convertDate(gon.weight_records[gon.weight_records.length - 1].date)

    // カレンダーの日本語化
    flatpickr.localize(flatpickr.l10ns.ja)

    const periodCalendarOption = {
        // スマートフォンでもカレンダーに「flatpickr」を使用
        disableMobile: true,
        // 選択できる期間を設定
        minDate: START_DATE,
        maxDate: END_DATE,
        // 日付選択後のイベント
        // onChange: （後で記述）
    }

    // カレンダー
    const startCalendarFlatpickr = flatpickr('#start-calendar', periodCalendarOption)
    const endCalendarFlatpickr = flatpickr('#end-calendar', periodCalendarOption)
    
    // '2020-01-12'のような文字列から，Javascriptの日付オブジェクトを取得する関数
    // setHoursを使用しないと，時差の影響で0時にならないため注意！
    const convertDate = (date) => new Date(new Date(date).setHours(0, 0, 0, 0))

    const TODAY = convertDate(new Date())
    const A_WEEK_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 6)
    const TWO_WEEKS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() - 13)
    const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate() + 1)
    const THREE_MONTHS_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() - 3, TODAY.getDate() + 1)

    // グラフを描く場所を取得
    const chartWeightContext = document.getElementById("chart-weight").getContext('2d')

    // 関数内で変数宣言をするとローカル変数となり，関数の外で消えてしまう
    // drawGraph 関数の外で変数宣言をしなければならない!
    let chartWeight

    // 期間を指定してグラフを描く
    const drawGraph = (from, to) => {
        // from から to までの期間のデータに絞る
        let records = gon.weight_records.filter((record) => {
            let date = convertDate(record.date)
            return from <= date && date <= to
        })

        // 体重のみのデータを作成
        let weights = records.map((record) => record.weight)

        let weightData = {
            labels: dates,
            datasets: [{
                label: '体重(kg)',
                data: weights,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                spanGaps: true
            }]
    }

    let weightOption = {
        tooltips: {
            callbacks: {
                // ホバー（スマホならタップ）時のラベル表示を変更
                title: function (tooltipItems) {
                    return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
                },
                label: function (tooltipItem) {
                    return '体重: ' + tooltipItem.yLabel + 'kg'
                }
            }
        }
    }

    if (!chartWeight) {
        // グラフが存在しないときは，作成する
        chartWeight = new chartWeight(chartWeightContext, {
            type: 'line',
            data: weightData,
            options: weightOption
        })
    } else {
        // グラフが存在するときは，更新する
        chartWeight.data = weightData
        chartWeight.options = weightOption
        chartWeight.update()
    }
}

// 引数の日付から今日までのグラフを描く関数
const drawGraphToToday = (from) => {
    // データが存在する範囲に修正
    from = maxDate(from, START_DATE)
    let to = minDate(TODAY, END_DATE)
    drawGraph(from, to)
}

// 過去◯週間のグラフを描くボタン
document.getElementById('a-week-button').addEventListener('click', () => {
    drawGraphToToday(A_WEEK_AGO)
})

document.getElementById('two-weeks-button').addEventListener('click', () => {
    drawGraphToToday(TWO_WEEKS_AGO)
})

document.getElementById('a-month-button').addEventListener('click', () => {
    drawGraphToToday(A_MONTH_AGO)
})

document.getElementById('three-months-button').addEventListener('click', () => {
    drawGraphToToday(THREE_MONTHS_AGO)
})

// グラフの初期表示
drawGraphToToday(A_WEEK_AGO)

})

// // Place all the behaviors and hooks related to the matching controller here.
// // All this logic will automatically be available in application.js.
// document.addEventListener('turbolinks:load', () => {
//   // カレンダーの表示
//   flatpickr('#date-form')

//   const TODAY = new Date(new Date().setHours(0, 0, 0, 0))
//     const A_MONTH_AGO = new Date(TODAY.getFullYear(), TODAY.getMonth() -1, TODAY.getDate())

//     // 選択できない日付データ
//     const DISABLE_DATES = ['2019-12-10', '2019-12-20', '2019-12-30', '2020-01-10', '2020-1-20', '2020-01-30']

//     // カレンダーの日本語化
//     flatpickr.localize(flatpickr.l10ns.ja)

//     // カレンダーの表示
//     flatpickr('#date-form', {
//       // スマートフォンでもカレンダーに「flatpickr」を使用
//       disableMobile: true,
//       // 1ヶ月前から本日まで選択可
//       minDate: A_MONTH_AGO,
//       maxDate: TODAY,
//       // 選択できない日付
//       disable: DISABLE_DATES
//     })

//     // 棒グラフのデータ（値を変更するとグラフが変化することを確認して観て下さい）
//     let barLabel = ['1月', '2月', '3月', '4月', '5月', '6月']
//     let barData = [5, 4, 2, 6, 5, 8]

//     // 棒グラフのオプション

//     const barChartData = {
//         labels: barLabel,
//         datasets: [{
//             label: '得点',
//             data: barData,
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//         }]
//     }

//     const barChartOption = {
//       title: {
//           display: true,
//           text: '棒グラフ'
//       },
//       scales: {
//           yAxes: [{
//               ticks: {
//                   // y軸のメモリを0からスタートに強制
//                   beginAtZero: true
//               }
//           }]
//       }
//     }

//     // 棒グラフを表示
//     const barChartContext = document.getElementById("bar-chart").getContext('2d')
//     new Chart(barChartContext, {
//         type: 'bar',
//         data: barChartData,
//         options: barChartOption
//     })

//     // 折れ線グラフのデータ（値を変更するとグラフが変化することを確認してみて下さい）
//     let lineLabel = gon.chart_label
//     let lineData = gon.chart_data

//     // 折れ線グラフのオプション

//     const lineChartData = {
//         labels: lineLabel,
//         datasets: [{
//             label: '体重(kg)',
//             data: lineData,
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,
//             spanGaps: true
//         }]
//     }

//     const lineChartOption = {
//         title: {
//             display: true,
//             text: '折れ線グラフ'
//         },
//         tooltips: {
//             callbacks: {
//                 // ホバー（スマホならタップ）時のラベル表示を変更
//                 title: function (tooltipItems) {
//                     return tooltipItems[0].xLabel.replace(/^(\d+).(\d+)$/, ' $1 月 $2 日')
//                 },
//                 label: function (tooltipItem) {
//                     return '体重: ' + tooltipItem.yLabel + 'kg'
//                 }
//             }
//         }
//     }

//     // 折れ線グラフを表示
//     const lineChartContext = document.getElementById("line-chart").getContext('2d')
//     new Chart(lineChartContext, {
//         type: 'line',
//         data: lineChartData,
//         options: lineChartOption
//     })
// })
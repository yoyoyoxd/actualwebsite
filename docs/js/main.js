import {CountUp} from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.min.js";
import TransactionStats from "./TransactionStats.js";
import Calculator, {Events as CalcEvents} from "./Calculator.js";
import CONTRACT_ABI from "./abi.js";

function getElByID(id) {
    return document.getElementById(id);
};

const stats = new TransactionStats('0x13572851103bed49ff743af4c4bb5ace88b22e2f', CONTRACT_ABI, 'wss://mainnet.infura.io/ws/v3/4dd869b552454cc79348980651f943dd');
// roughly a day's worth of blocks
stats.getTransactionStats(6498).then((stats) => {
    const totalCnt = new CountUp('tx_total', Math.round(stats.total / 1e9));
    totalCnt.start();

    const feesCnt = new CountUp('tx_fees', Math.round(stats.fees / 1e9));
    feesCnt.start();
});

if (getElByID('calculator')) {
    const calc = new Calculator(
        5000000,
        5,
        [50000, 100000, 150000, 200000, 250000, 500000, 750000, 1000000, 2000000, 3000000, 5000000, 10000000],
        getElByID('calc_holdings'),
        getElByID('calc_volume')
    );
    calc.on(CalcEvents.CALC_EVENT_CALCULATE, (rewards) => {
        const rewardsCnt = new CountUp('calc_results', rewards);
        rewardsCnt.start();
    });

    calc.on(CalcEvents.CALC_EVENT_VOLUME, (volume) => {
        getElByID('calc_volume_val').innerHTML = volume.toLocaleString();
    });

    calc.calculate();
}

$(function () {
    function setMenuBg() {
        const nav = $('.main-nav');
        if ($(window).scrollTop() === 0) {
            nav.removeClass('main-nav--dark');
        } else {
            nav.addClass('main-nav--dark');
        }
    }

    $(window).on('scroll', setMenuBg);

    setMenuBg();
});

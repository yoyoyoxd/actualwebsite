import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.min.js";
import TransactionStats from "./TransactionStats.js";
import CONTRACT_ABI from "./abi.js";
const stats = new TransactionStats('0x13572851103bed49ff743af4c4bb5ace88b22e2f', CONTRACT_ABI, 'wss://mainnet.infura.io/ws/v3/4dd869b552454cc79348980651f943dd');
// roughly a day's worth of blocks
stats.getTransactionStats(6498).then((stats) => {
    const totalCnt = new CountUp('tx_total', Math.round(stats.total / 1e9));
    totalCnt.start();

    const feesCnt = new CountUp('tx_fees', Math.round(stats.fees / 1e9));
    feesCnt.start();
});

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

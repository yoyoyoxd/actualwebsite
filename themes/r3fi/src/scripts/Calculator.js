/*
    Calculate potential fee income
 */

/**
 * Event receives volume (int) and volume fees (int)
 * @type {string}
 */
const CALC_EVENT_VOLUME = 'vu';
/**
 * Event receives holdings (int) and percentage of supply (float)
 * @type {string}
 */
const CALC_EVENT_HOLDING = 'hu';
/**
 * Event receives rewards (int), volumeFees (int)
 * @type {string}
 */
const CALC_EVENT_CALCULATE = 'calc';

export const Events = {
    CALC_EVENT_HOLDING,
    CALC_EVENT_VOLUME,
    CALC_EVENT_CALCULATE
};

class Calculator {
    totalSupply;
    feesPerc;
    holdingsEl;
    volumeEl;
    events = {};
    volumeMarks;

    /**
     *
     * @param {number} totalSupply
     * @param {number} feesPerc
     * @param {number[]} volumeMarks array of numbers to use for the range slider input
     * @param {Element} holdingsEl
     * @param {Element} volumeEl
     */
    constructor(totalSupply, feesPerc, volumeMarks, holdingsEl, volumeEl) {
        this.volumeMarks = volumeMarks;
        this.totalSupply = totalSupply;
        this.feesPerc = feesPerc;
        this.holdingsEl = holdingsEl;
        this.volumeEl = volumeEl;

        this.init();
    }

    on(event, cb) {
        this.events[event] = cb;
    }

    init() {
        this.volumeEl.addEventListener('change', this.calculate.bind(this));
        this.holdingsEl.addEventListener('change', this.calculate.bind(this));
    }

    trigger(event, args) {
        if (typeof this.events[event] === "function") {
            this.events[event](...args);
        }
    }

    calculate() {
        const holdings = parseInt(this.holdingsEl.value);
        const volume = this.volumeMarks[parseInt(this.volumeEl.value)];

        const holdingsPerc = holdings / this.totalSupply;
        const volumeFees = volume / 100 * this.feesPerc;
        const rewards = Math.round(volumeFees * holdingsPerc);

        this.trigger(CALC_EVENT_HOLDING, [holdings, holdingsPerc]);
        this.trigger(CALC_EVENT_VOLUME, [volume, volumeFees]);
        this.trigger(CALC_EVENT_CALCULATE, [rewards, volumeFees]);
    }
}

export default Calculator;

// https://www.taniarascia.com/javascript-mvc-todo-app/
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindDigit(this.model.handleDigit);
    this.view.bindCE(this.model.handleCE);
    this.view.bindC(this.model.handleC);
    this.view.bindOperation(this.model.handleOperation);
    this.view.bindResult(this.model.handleResult);
    this.view.bindNeg(this.model.handleNeg);
    this.view.bindDecimal(this.model.handleDecimal);

    this.model.bindSetCurrentNumView(this.view.setCurrentNumView);
    this.model.bindSetCalculationView(this.view.setCalculationView);
  }
}

class Model {
  constructor() {
    this.currentNum = '0';
    this.opType = '+';
    this.opsLocked = true;
    this.cache = 0;
    this.calculation = '';
  }

  bindSetCurrentNumView = (handler) => {
    this.setCurrentNumView = handler;
  }

  bindSetCalculationView = (handler) => {
    this.setCalculationView = handler;
  }

  handleDigit = (digit) => {
    this.currentNum === '0' ? this.currentNum = digit : this.currentNum += digit;
    this.opsLocked = false;
    this.setCurrentNumView(this.currentNum);
  }

  handleCE = () => {
    this.currentNum = '0';
    this.opsLocked = true;
    this.setCurrentNumView(this.currentNum);
  }

  handleC = () => {
    this.handleCE();
    this.cache = 0;
    this.calculation = '';
    this.opType = '+';
    this.setCalculationView(this.calculation);
  }

  handleOperation = (operation) => {
    if (this.opsLocked) return;

    this.updateCache();
    this.setCurrentNumView(this.cache);

    this.opType = operation;
    this.updateCalculation();
    this.setCalculationView(this.calculation);

    this.opsLocked = true;
    this.currentNum = '0';
  }

  handleResult = () => {
    if (!this.opsLocked) {
      this.updateCache();
      this.setCurrentNumView(this.cache);
    }

    this.currentNum = String(this.cache);
    this.opType = '+';

    this.cache = 0;
    this.calculation = '';
    this.setCalculationView(this.calculation);

    this.opsLocked = false;
  }

  handleNeg = () => {
    if (this.currentNum === '0') return;

    if (this.currentNum[0] === '-') {
      this.currentNum = this.currentNum.slice(1);
    } else {
      this.currentNum = '-' + this.currentNum;
    }
    this.setCurrentNumView(this.currentNum);
  }

  handleDecimal = () => {
    if (!this.currentNum.includes('.')) this.currentNum += '.';
    this.opsLocked = false;
    this.setCurrentNumView(this.currentNum);
  }

  updateCache = () => {
    let num = Number(this.currentNum);
    switch (this.opType) {
      case '+': this.cache += num; break;
      case '-': this.cache -= num; break;
      case 'x': this.cache *= num; break;
      case '/': this.cache /= num; break;
      case '%': this.cache %= num; break;
    }
  }

  updateCalculation = () => {
    this.calculation += `${Number(this.currentNum)} ${this.opType} `;
  }
}

class View {
  constructor() {
    this.$currentNum = $('p.current_num');
    this.$calculation = $('p.calculation');
    this.$buttons = $('div#buttons');
    this.$ce = $('a#ce');
    this.$c = $('a#c');
    this.$result = $('a.result_button');
    this.$neg = $('a#neg');
    this.$decimal = $('a.dot');
  }

  bindDigit = (handler) => {
    this.$buttons.on('click', 'a.digit', function (e) {
      let digit = $(this).text();
      handler(digit);
    });
  }

  bindCE = (handler) => {
    this.$ce.on('click', function (e) {
      handler();
    });
  }

  bindC = (handler) => {
    this.$c.on('click', function (e) {
      handler();
    });
  }

  bindOperation = (handler) => {
    this.$buttons.on('click', 'a.op', function (e) {
      let op = $(this).text();
      handler(op);
    });
  }

  bindResult = (handler) => {
    this.$result.on('click', function (e) {
      handler();
    });
  }

  bindNeg = (handler) => {
    this.$neg.on('click', function (e) {
      handler();
    });
  }

  bindDecimal = (handler) => {
    this.$decimal.on('click', function (e) {
      handler();
    });
  }

  setCurrentNumView = (currentNum) => {
    this.$currentNum.text(currentNum);
  }

  setCalculationView = (calculation) => {
    this.$calculation.text(calculation);
  }
}

$(() => { const app = new Controller(new Model, new View) });
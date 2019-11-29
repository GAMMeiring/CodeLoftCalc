import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.page.html',
    styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
    public stringEquation = '';
    public answer;
    public forceReset = false;

    constructor() {
    }

    ngOnInit() {
    }

    // TODO: Format equation
    addCharacterToEquation(char) {
        if (char === '=') {
            this.answer = this.evaluateEquation(this.stringEquation);
        }
        this.stringEquation = this.stringEquation + char;
    }

    /**
     * @param equation   An equation represented in string format.
     */
    evaluateEquation(equation) {
        this.forceReset = true;
        // TODO: Add sin, cos, tan
        // 'sin': x => Math.sin(Math.toRadians(x))
        const operatorMap = {
            '+': (a, b) => parseFloat(a) + parseFloat(b),
            '-': (a, b) => parseFloat(a) - parseFloat(b),
            'x': (a, b) => parseFloat(a) * parseFloat(b),
            '÷': (a, b) => parseFloat(a) / parseFloat(b),
            '^': (a, b) => Math.pow(parseFloat(a), parseFloat(b)),
            '√': (a, b) => Math.sqrt(parseFloat(a), parseFloat(b))
        };
        const operatorList = Object.keys(operatorMap);

        let answer = 0;
        let next = '';
        let currentOperator = '+';

        const matches = equation.match(/\((.*)\)/);
        if (matches) {
            const subAnswer = this.evaluateEquation(matches[1]);
            equation = _.replace(equation, matches[0], subAnswer.toString());
        }

        // TODO: Replace operators that are adjacent for arithmatic to work.

        for (const character of equation) {
            if (_.has(operatorMap, character)) {
                if (isNaN(operatorMap[currentOperator](answer, next))) {
                    next = '0';
                }
                answer = operatorMap[currentOperator](answer, next);
                currentOperator = character;
                next = '';
            } else {
                next += character;
            }
        }
        if (isNaN(operatorMap[currentOperator](answer, next))) {
            answer = '0';
        }
        return operatorMap[currentOperator](answer, next);
    }

    clearEquation() {
        this.stringEquation = '';
        this.answer = null;
        this.forceReset = false;
    }

}

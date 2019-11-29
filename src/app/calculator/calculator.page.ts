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
            this.evaluateEquation(this.stringEquation);
        }
        this.stringEquation = this.stringEquation + char;
    }

    /**
     * @param equation   An equation represented in string format.
     */
    evaluateEquation(equation) {
        this.forceReset = true;
        const operatorMap = {
            '+': (a, b) => parseFloat(a) + parseFloat(b),
            '-': (a, b) => parseFloat(a) - parseFloat(b),
            'x': (a, b) => parseFloat(a) * parseFloat(b),
            '÷': (a, b) => parseFloat(a) / parseFloat(b)
        };

        let answer = 0;
        let next = '';
        let currentOperator = '+';

        for (const character of equation) {
            if (_.has(operatorMap, character)) {
                answer = operatorMap[currentOperator](answer, next);
                currentOperator = character;
                next = '';
            } else {
                next += character;
            }
        }
        this.answer = operatorMap[currentOperator](answer, next);
    }

    clearEquation() {
        this.stringEquation = '';
        this.answer = null;
        this.forceReset = false;
    }

}

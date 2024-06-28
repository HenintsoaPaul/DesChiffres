app.service('solutionService', function () {
    this.interpret = function (data) {
        const operations = this.buildOperationsString(data);
        console.log(`operations: ${operations}`);
        return operations;
    };

    this.buildOperationsString = function(data) {
        const operators = this.getListOperators(data);
        let operations = `${data[0][1]} ${operators[0]} ${data[0][2]}`;
        for (let i = 1; i < data.length; i++) {
            operations += ` ${operators[i]} ${data[i][2]}`;
        }
        return operations;
    };

    this.getListOperators = function(data) {
        return data.map(item => this.getOperator(item[3]));
    };

    this.getOperator = function(idOperator) {
        const operators = {
            0: '*',
            1: '+',
            2: '-',
            3: '/'
        };
        return operators[idOperator];
    };
});
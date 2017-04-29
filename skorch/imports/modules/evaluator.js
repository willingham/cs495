export const handleModifier = (code, value, updateInfo, updateFn) => {
    return () => {
        const toEval = "(function() { return " + code + ";})"
        const fn = eval(toEval).bind({value: value});
        updateFn(updateInfo, fn());
    };
}

const sumCounter = (name, team) => {
    let total = 0;
    team.players.forEach((player) => {
        player.counters.filter((c) => c.name == name).forEach((counter) => {
            total += counter.value;
        });
    });
    return total;
}

export const evalValueCounter = (code, team) => {
    if (!code) return false;
    const toEval = "(function() { return " + code + ";})";
    const fn = eval(toEval).bind(team);
    return fn();
}

const win = (obj) => {
    return "Winner";
}

const lose = (obj) => {
    return "Loser";
}

const dqplayer = (obj) => {
    return "Disqualified";
}

const tag = (obj, tag) => {
    return tag;
}

const getCounterValue = (name, obj) => {
    let val = 0;

    obj.counters.forEach((counter) => {
        if (counter.name == name) {
            if (counter.code) {
                val = evalValueCounter(counter.code, obj);
            } else {
                val = counter.value;
            }
        }
    });

    return val;
}

export const evalCondition = (condition, obj) => {
    let conditionToEval = '(function () { return ' + condition.condition + ';})';
    let conditionFn = eval(conditionToEval).bind(obj);

    let resultToEval = '(function () { return ' + condition.code + ';})';
    let resultFn = eval(resultToEval).bind(obj);

    if (conditionFn()) {
        return resultFn();
    }
    
    return '';
}

import * as _ from "lodash";


export function collect(valuePair: string, memo: {[key: string]: string}) {

    const pair = valuePair.split("=");
    const key = pair[0];

    memo[key] = pair[1];

    return memo;
}

export function setting(pathAndValue: string, settings: any) {

    const pathValuePair = pathAndValue.split("=");

    _.set(settings, pathValuePair[0], pathValuePair[1]);

    return settings;
}

export const split = (value: string) => value.split(",");

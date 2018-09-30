export class Util {
    constructor() { }

    public static formatToIstTimesStamp = (element) => {
        const currentTime = new Date();
        const currentOffset = currentTime.getTimezoneOffset();
        const ISTOffset = 330;
        const ISTTime = (element * 1000) + (ISTOffset + currentOffset) * 60000;
        return ISTTime;
    }


    public static formatJsonData = (data) => {
        const _dummy = [];
        if (data) {
            const _t = data['t'];
            const _o = data['o'];
            const _h = data['h'];
            const _l = data['l'];
            const _c = data['c'];
            for (let index = 0; index < _t.length; index++) {
                _dummy.push([
                    Util.formatToIstTimesStamp(_t[index]),
                    _o[index],
                    _h[index],
                    _l[index],
                    _c[index]
                ]);
            }
        }
        return _dummy;
    }
}

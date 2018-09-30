import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'tableSort',
    pure: false
})
export class TableSortPipe implements PipeTransform {
    transform(value: any[], args?: any): any {

        if (value.length > 0 && args) {
            const _order = args.order === 'asc' ? 1 : -1;
            const _isArr = Array.isArray(value);
            const _valType = typeof value[0];
            const _flag = _isArr && _valType === 'object' ? true : _isArr && _valType !== 'object' ? false : true;

            value.sort((a, b) => {
                a = _flag ? a[args.prop] : a;
                b = _flag ? b[args.prop] : b;
                if (typeof a === 'string') {
                    return a > b ? -1 * _order : 1 * _order;
                } else if (typeof a === 'number') {
                    return a - b > 0 ? -1 * _order : 1 * _order;
                }
            });

        }
        return value;
    }
}

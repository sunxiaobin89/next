/* eslint-disable */
import assert from 'power-assert';
import US from '../../src/locale/en-us';
import JP from '../../src/locale/ja-jp';
import CN from '../../src/locale/zh-cn';
import HK from '../../src/locale/zh-hk';
import TW from '../../src/locale/zh-tw';
import VI from '../../src/locale/vi-vn';
import IT from '../../src/locale/it-it';
import PT from '../../src/locale/pt-pt';
import KR from '../../src/locale/ko-kr';
import MY from '../../src/locale/ms-my';
import TH from '../../src/locale/th-th';
import ID from '../../src/locale/id-id';

describe('Locale', () => {
    it('should be the same keys', () => {
        const usKeys = getKeys(US);
        const jpKeys = getKeys(JP);
        const cnKeys = getKeys(CN);
        const hkKeys = getKeys(HK);
        const twKeys = getKeys(TW);
        const viKeys = getKeys(VI);
        const itKeys = getKeys(IT);
        const ptKeys = getKeys(PT);
        const krKeys = getKeys(KR);
        const myKeys = getKeys(MY);
        const thKeys = getKeys(TH);
        const idKeys = getKeys(ID);

        assert(
            usKeys === jpKeys &&
                jpKeys === cnKeys &&
                cnKeys === hkKeys &&
                hkKeys === twKeys &&
                twKeys === viKeys &&
                viKeys === itKeys &&
                itKeys === ptKeys &&
                ptKeys === krKeys &&
                krKeys === myKeys &&
                myKeys === thKeys &&
                thKeys === idKeys
        );
    });
});

function getKeys(object, parent = '') {
    const keys = [];
    for (const key in object) {
        if (!object.hasOwnProperty(key) || key === 'momentLocale') continue;
        const value = object[key];
        keys.push(parent ? `${parent}.${key}` : key);

        if (Array.isArray(value)) {
            keys.push(`${key}_length_${value.length}`);
        } else if (typeof value === 'object') {
            keys.push(getKeys(value, key));
        }
    }
    return keys.join(',');
}

import {it,expect,describe} from 'vitest'
import { formatMoney } from './Money'

describe('formatMoney',()=>{
it('format 1999$ as 19.99$',()=>{
    expect(formatMoney(1999)).toBe('$19.99')
})
it('displays 2 decimals',()=>{
    expect(formatMoney(1190)).toBe('$11.90')
})
})

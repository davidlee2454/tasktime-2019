export const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

export class Duration {
  static parse(s) {
    let m = 60
    let h = 60*m
    let d = 24*h
    let y = 365*d
    const f = (c,n) => s<c ? null : Math.floor(s%n/c) // c: current unit, n: next unit
    return {
      seconds: s % m,
      minutes: f(m,h),
      hours: f(h,d),
      days: f(d,s+1),
    }
  }

  static str(i) {
    let o = this.parse(i)
    var s = ''
    const a = (value, unit) => { if (value !== null) s+= (value < 10 ? '0' : '') + value + unit }
    a(o.days, 'd')
    a(o.hours, 'h')
    a(o.minutes, 'm')
    a(o.seconds, 's')
    return s
  }
}

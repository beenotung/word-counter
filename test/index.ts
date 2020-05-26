import { WordCounter } from '../src'

const counter = new WordCounter()
counter.addString('"Foo" is a bar.')
counter.addString('But "Bar" is not foo!')
counter.collapse()
console.log(counter.export().sort((a, b) => b.count - a.count))

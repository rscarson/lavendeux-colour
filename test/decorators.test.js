import { test, expect } from 'vitest';
import '../src/decorators';

test('decoratorColour', () => {
    expect(decoratorColour({'Integer': 0xfdbcb4})).toStrictEqual('#fdbcb4');
});
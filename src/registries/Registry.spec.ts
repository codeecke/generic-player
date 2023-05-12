import { expect } from "@jest/globals";
import { Registry} from "./Registry";
import { MockItem } from "./MockItem";

describe('Registry', () => {
    const values = [
        'MockItem',
        'MockItem',
        'MockItem2',
        'MockItem3',
        'MockItem4',
        'MockItem5',
    ]
    let registry: Registry<MockItem>;
    let containingElement = new MockItem('MockItem4')

    beforeEach(() => {
        registry = new Registry<MockItem>()
        values.forEach(value => {
            if(value === 'MockItem4') {
                registry.register(containingElement)
            } else {
                registry.register(
                    new MockItem(value)
                )
            }
        })
    })

    test('contains', () => expect(registry.contains(containingElement)).toBeTruthy())
    test('contains not', () => expect(registry.contains(new MockItem('MockItem42'))).toBeFalsy())
    test('find', () => {
        const item = registry.find('value', 'MockItem5')
        expect(item).toBeInstanceOf(MockItem)
        expect(item?.value).toEqual('MockItem5')

    })
    test('find not', () => expect(registry.find('value', 'MockItem6')).toEqual(undefined))
    test('findAll', () => {
        const found = registry.findAll('value', 'MockItem')
        expect(found).toBeInstanceOf(Registry<MockItem>)
        expect(found.size).toBe(2)
        found.forEach(item => expect(item.value).toEqual('MockItem'))
    })
    test('findAll notFound', () => {
        const found = registry.findAll('value', 'MockItem6')
        expect(found).toBeInstanceOf(Registry<MockItem>)
        expect(found.size).toBe(0)
    })
    test('forEach', () => {
        let counter = 0
        registry.forEach(item => {
            expect(item.value).toEqual(values[counter])
            counter++
        })
    })
    test('unregister', () => {
        registry.unregister(containingElement);
        expect(registry.size).toBe(5)
    })
    test('getItemByIndex(5)', () => {
        const item = registry.getItemByIndex(5)
        expect(item?.value).toEqual('MockItem5')
    })
    test('getItemByIndex(12)', () => {
        const item = registry.getItemByIndex(12)
        expect(item).toEqual(undefined)
    })
    test('getItemByIndex(12) on empty registry', () => {
        const emptyRegistry = new Registry<MockItem>()
        expect(emptyRegistry.getItemByIndex(12)).toEqual(undefined)
    })
})
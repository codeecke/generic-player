export class Registry<T> {
    private items: Set<T> = new Set()

    get size(): number {
        return this.items.size
    }

    register(item: T): Registry<T> {
        this.items.add(item)
        return this
    }

    unregister(item: T): boolean {
        return this.items.delete(item)
    }

    contains(item: T): boolean {
        return this.items.has(item)
    }

    find<U extends keyof T >(propName: U, value: T[U]): T | undefined {
        const items = this.findAll(propName, value);
        
        return (items.size > 0) ? items.getItemByIndex(0) : undefined
    }

    findAll<U extends keyof T >(propName: U, value: T[U]): Registry<T> {
        return this.findByCallback(item => item[propName] === value);
    }

    findByCallback(callback: (item: T) => boolean): Registry<T> {
        const result: Registry<T> = new Registry<T>();
        this.items.forEach(item => {
            if(callback(item)) result.register(item)
        })
        return result;

    }

    forEach(callback: (item: T) => void) {
        this.items.forEach(callback)
    }
    
    getItemByIndex(index: number) {
        if(this.items.size === 0) return undefined;
        let iterator = this.items.values()
        let value = iterator.next()
        let counter = 0;
        while(counter <= index && !value.done) {
            if(counter === index) {
                return value.value
            }
            counter++;
            value = iterator.next()
        }
        return undefined
    }
    
}


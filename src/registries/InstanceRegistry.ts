import {GenericPlayer} from "../players/generic/GenericPlayer";

class InstanceRegistry {
    private instances: GenericPlayer[] = [];

    public register(instance: GenericPlayer) {
        this.instances.push(instance);
    }

    public fetchAll() {
        return this.instances;
    }

}

export const instanceRegistry = new InstanceRegistry();
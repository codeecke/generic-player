import {ZuluPlayer} from "../players/zuluplayer/ZuluPlayer";

class InstanceRegistry {
    private instances: ZuluPlayer[] = [];

    public register(instance: ZuluPlayer) {
        this.instances.push(instance);
    }

    public fetchAll() {
        return this.instances;
    }

}

export const instanceRegistry = new InstanceRegistry();
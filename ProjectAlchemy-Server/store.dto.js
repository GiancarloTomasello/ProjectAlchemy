class CreateStoreDTO{
    constructor(id, name, type, rarity, cost, unit, equipmentCatagory, gearCategory, description, weight){
        this.id=id;
        this.name=name;
        this.type=type;
        this.rarity=rarity;
        this.cost=this.calculateCost(cost, rarity);
        this.unit=unit;
        this.equipmentCatagory=equipmentCatagory;
        this.gearCategory=gearCategory;
        this.description=description;
        this.weight=weight;
    }

    isValid(){
        return this.name && this.id && this.rarity;
    }

    calculateCost(cost, rarity){
        if(rarity=='basic' && cost > 0){
            return cost
        } else if (rarity=='basic' && cost <= 0){
            return 1
        } else if(rarity!='basic' && cost < 0){
            switch (rarity){
                case 'Common':
                    return '100';
                case 'Uncommon':
                    return '400';
                case 'Rare':
                    return '4000';
                case 'Very Rare':
                    return '40000';
                case 'Legendary':
                    return '200000';
                case 'Artifact':
                    return 'Priceless';
                default:
                    return cost;
            }
        }else {
            return cost;
        }
    }
}

module.exports = {
    CreateStoreDTO
}
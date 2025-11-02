class CreateStoreDTO{
    constructor(id, name, type, rarity, cost, equipmentCatagory, gearCategory, description, weight){
        this.id=id;
        this.name=name;
        this.type=type;
        this.rarity=rarity;
        this.cost=cost;
        this.equipmentCatagory=equipmentCatagory;
        this.gearCategory=gearCategory;
        this.description=description;
        this.weight=weight;
    }

    isValid(){
        return this.name && this.id && this.rarity;
    }
}

module.exports = {
    CreateStoreDTO
}
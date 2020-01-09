import Price from '~/model/price.js';

class ShipModule {
    constructor(data) {
        this.name = data.name;
        this.slug = data.slug;
        this.description = data.description;
        this.picture = data.picture;
        this.picture_flip_x = data.picture_flip_x;
        this.picture_flip_y = data.picture_flip_y;
        this.type = data.type;
        this.size = data.size;
        this.shape = data.shape;
        this.scores = data.scores;
        this.stats = (data.stats) ? data.stats : {};
        this.ship_stats = (data.ship_stats) ? data.ship_stats : {};
        this.price = data.price;
    }

    // static createFromSlug(slug) {
    //     const moduleData = modulesData[slug];
    //     //moduleData.name = translatedData.name;
    //     //moduleData.description = translatedData.description;
    //     moduleData.slug = slug;
    //     moduleData.price = Price.format(moduleData.price);
    //     return new ShipModule(moduleData);
    // }

    static getAll() {
        const modules = new Array();
        for (const moduleSlug in modulesData) {
            modules.push(ShipModule.createFromSlug(moduleSlug));
        }
        return modules;
    }
}

export default ShipModule;

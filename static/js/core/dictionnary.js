class Dictionnary {
    constructor(lang) {
        this.init = fetch(`/static/translations/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                this.translations = data;
                return data;
            })
            .catch(error => console.log(error))
        ;
    }

    translateTags() {
        const self = this;
        this.init.then(() => document.querySelectorAll("[data-translate=true]").forEach(element => {
            const keys = element.innerText.trim().split('.');
            let result = Object.assign({}, self.translations);
            keys.forEach(key => {
                if (typeof result[key] === 'undefined') {
                    result = element.innerText;
                    return;
                }
                result = result[key];
            });
            element.innerText = result;
        }));
    }
}

export default new Dictionnary('fr');

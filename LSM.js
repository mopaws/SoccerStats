//local storage
/*
class LocalStorageManager {
    constructor(model, lsKey) {
        this.lsKey = lsKey;
        let existingValues = JSON.parse(localStorage.getItem(lsKey));
        if(existingValues) {
            for(let val of existingValues){
                model.addRoll(val);
            }
        }
        
        model.subscribe(function(scope, msg) {
            if(msg === 'updatedRoll') {
                this.save(scope.getRolls());
            }
        }.bind(this));
    }
    save(data) {
        localStorage.setItem(this.lsKey, JSON.stringify(data));
    }
    
}
*/

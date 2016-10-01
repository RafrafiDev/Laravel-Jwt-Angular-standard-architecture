/**
 * Created by benext-tpl on 30.09.16.
 */
Array.prototype.getIndexOfObject = function(prop, value){
    for (var i = 0; i < this.length ; i++) {
        if (this[i][prop] === value) {
            return i;
        }
    }
}
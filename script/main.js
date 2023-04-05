/*
Crea una lista de la compra que tenga:
1.Un listado de productos:
    1.2. Cada producto tendrá un botón de añadir dicho producto en el localStorage.
    1.3. Un botón de eliminar el producto de la lista existente(Se eliminará del localStorage)
2.Todo producto que se añada o se elimine del localStorage se verá reflejado automaticamente en otra lista en el propio navegador.
3.Tendremos un botón para vaciar la lista completa del localStorage.
*/
//QUERY SELECTORS
const seccIng = document.querySelector('#ingredients');
const seccAdd = document.querySelector('#added');
const fragment = document.createDocumentFragment();

//VARS
const arrayIngredients = ['carne', 'cebolla', 'tomate', 'lechuga', 'pepinillo'];

const addedIngredients = [];

//EVENTS
document.addEventListener('click', ({ target }) => {
    //tres casos, addItem, delItem y delAllItems
    if (target.matches('.add')) {// o (target.className=='add')

        let id = target.parentElement.id;
        //id= algun elemento del arrayIngredients

        if (searchIng(id)) {
            console.log('existe')
            //si existe en el array sobreescribe el ingrediente para subir en uno su contador(count)
            plus(id);
            //lo introduce en el local
            setLocal();
            console.log(addedIngredients)

        } else {//undefined
            let obj = {
                id,
                count: 1
            };
            addedIngredients.push(obj);
            setLocal();
        }
        //pinta lo que haya en el local
        drawAdds();
    }
    if (target.matches('.del')) {

        let id = target.parentElement.id;

        less(id);
        setLocal();
        console.log(addedIngredients);

        drawAdds();
    }
    if (target.matches('.delAll')) {

    }

})
//FUNCTIONS
const searchIng = (ing) => {//devuelve true o false si el ingrediente está en addedIngredients
    const exist = addedIngredients.find(({ id }) => id == ing) ? true : false;
    console.log(exist)
    return exist
}

const plus = (ing) => {
    const ind = addedIngredients.findIndex(({ id }) => id == ing);
    const exist = addedIngredients.find(({ id }) => id == ing);
    exist.count++;
    addedIngredients.splice(ind, 1, exist);
}

const less = (ing) => {
    const ind = addedIngredients.findIndex(({ id }) => id == ing);
    const exist = addedIngredients.find(({ id }) => id == ing);
    if (exist.count > 0) {
        exist.count--;
        addedIngredients.splice(ind, 1, exist);
    } else if(exist.count==0){
        addedIngredients.splice(-ind, 1);
        console.log(addedIngredients)
    }
}

//DRAW
const drawIngredients = () => {
    arrayIngredients.forEach((item) => {
        let divItem = document.createElement('div');
        seccIng.append(divItem);
        divItem.setAttribute('id', `${item}`);
        const butAdd = document.createElement('button');
        butAdd.textContent = 'Añadir';
        divItem.append(butAdd);
        butAdd.className = 'add';
        const itemName = document.createElement('p');
        itemName.innerHTML = `${item}`;
        divItem.append(itemName);
        const butDel = document.createElement('button');
        butDel.textContent = 'Eliminar';
        divItem.append(butDel);
        butDel.className = 'del';
    })
};

const drawAdds = () => {

    seccAdd.innerHTML = '';//limpiamos la lista
    console.log(seccAdd);
    const adds = getLocal();//recogemos los objetos parseados del localStorage
    console.log('lo que hay en el local: ', adds);
    adds.forEach(({ id, count }) => {
        const divIng = document.createElement('DIV');
        divIng.id = id;
        divIng.innerHTML = `${id} count = ${count} <button class="del">Eliminar</button>`

        fragment.append(divIng);
    })
    seccAdd.append(fragment);
    //si el addedingredients esta vacio pero el local no, caso que ocurre al refrescar pagina, introducimos todos los valores del local en el array
    if (addedIngredients.length == 0 && adds.length != 0) {
        adds.forEach(ing => {
            addedIngredients.push(ing);
        })
    }

}
//LOCAL STORAGE
//añadir al local
const setLocal = () => {
    console.log('seteando Local...')
    localStorage.setItem('addList', JSON.stringify(addedIngredients));
}

//recoger el local
const getLocal = () => {
    return JSON.parse(localStorage.getItem('addList')) || [];
}


const init = () => {
    drawIngredients()
    drawAdds();
}
init();



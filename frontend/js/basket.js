document.addEventListener('DOMContentLoaded', function(){
    for (i in localStorage){
        let object = localStorage[i];
        let item = JSON.parse(object);
        if (item.amount > 0){
            document.getElementById("cardsContainer").innerHTML +=
            "<div class='basket__cardsContainer-card'>" + 
            "<div class='basket__cardsContainer-card-img'><img src='" + item.imageUrl + "' alt='image de l'article " + item._id + "'></div>" +
            "<div class='basket__cardsContainer-card-amount'>" +
            "<label for='" + item.name + "'>Nbr d'article :</label> "+ 
            "<input type='number' id='" + item.name + "' name='" + item.name + "' value='" + item.amount + "' onblur='changeAmount("+ item.name + ", " + item._id + ")' min='0' max='999'></div>" +
            "<div class='basket__cardsContainer-card-infos'>" +
            "<p class='basket__cardsContainer-card-infos-name'>" + item.name + "</p>" +
            "<p class='basket__cardsContainer-card-infos-description'>" + item.description + "</p>" +
            "</div> " +
            "<p class='basket__cardsContainer-card-infos-price' id='" + item.name + "'Price>" + (item.price*item.amount/1000).toString().replace('.', ',') + "€</p>" +
            "</div>";
        }
        else{
            /* */
        }
    }
})


function changeAmount(name, id){
    console.log("ok");
    let newAmount = document.getElementById(name);
    console.log(newAmount);
    document.getElementById("'" + name + "Price'").innerHTML = (item.price*newAmount/1000).toString().replace('.', ',');
    let changingObject = localStorage.getItem(id);
    let changingItem = JSON.parse(changingObject);
    changingItem.amount = newAmount;
    localStorage.setItem(id, JSON.stringify(changingItem));
}
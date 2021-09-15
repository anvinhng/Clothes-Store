

//Pop Up Form Function
flag = false;
function openCloseForm() {
    if (flag==false)
    {
        document.getElementById("user").style.display = "block";
        flag=true;
    }
    else {
        document.getElementById("user").style.display = "none";
        flag=false;
    }
}


// Remove function
function deleteFirstItem(){   
    document.getElementById("firstItem").remove();
}

function deleteSecondItem(){   
    document.getElementById("secondItem").remove();
}

function clearAll(item){
    var elements = document.getElementsByClassName("item");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Shopping-Cart Functions
function addPrice()
    let price = number(document.getElementsByClassName("product-price"));
    let quantity = number(document.getElementsByName("quantity"));




function totalEachItems(input){
    let itemTotal = price*quantity;
    console.log(itemTotal);
    document.getElementsByClassName("total").innerHTML = itemTotal;
}


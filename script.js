let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
document.getElementById("price").textContent = price;
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

let monetaryUnits = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.10],
  ["NICKEL", 0.05],
  ["PENNY", 0.01],
];

const totalCashInDrawer = (arr) =>{
  let sum = 0
  for(let i = 0; i<arr.length; i++){
    sum = sum + arr[i][1]
  }
  sum =  sum.toFixed(2)
  return sum
}

purchaseBtn.addEventListener("click", () =>{
    const cash = document.getElementById("cash");
    let change = cash.value - price
    let totalCash = totalCashInDrawer(cid)
    let revCid = cid.reverse();
    console.log(typeof(price))
    console.log(typeof(Number(cash.value)))
    if(change < 0){
      alert("Customer does not have enough money to purchase the item");
    }
    if(Number(cash.value) == price){
      return changeDue.textContent = "No change due - customer paid with exact cash";
    }
    if(totalCash == change){
      for (let ele of revCid){
        if(ele[1] != 0){
          changeDue.textContent = `Status: CLOSED ${ele[0]}: $${totalCash}`
        }
      }
     
    }
    else{
      
        if(change > totalCash){
          return changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        }
        if(totalCash > change){
          
          let t = []
          let count = {}
          for (let i = 0; i < revCid.length; i++){
            while(change >= monetaryUnits[i][1] && change>0 && revCid[i][1] > 0){
                  t.push(monetaryUnits[i][1])
                  revCid[i][1] -= monetaryUnits[i][1]
                  change = parseFloat(change -= monetaryUnits[i][1]).toFixed(2)
            }
          }
          if(change>0){
            return changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
          }
          else{ 
            for (let ele of t) {
              if (count[ele]) {
                  count[ele] += 1;
              } else {
                  count[ele] = 1;
              }
            }
         
            t = Object.entries(count).sort((a,b)=> parseFloat(a) - parseFloat(b)).reverse()
           
            changeDue.textContent = "Status: OPEN "
            for ( let i = 0; i < monetaryUnits.length ; i++){
                    let res = parseFloat(t[i][0])*t[i][1]
                    for (let ele of monetaryUnits){
                      if (ele[1] == parseFloat(t[i][0])){
                      
                         changeDue.textContent += `${ele[0]}: $${res} `
                      }
                    }
                  
                  
            }
          }

        }
    }

  })


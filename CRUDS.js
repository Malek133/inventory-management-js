


        let name = document.getElementById("prodect-name");
        let price = document.getElementById("price");
        let ads = document.getElementById("ads");
        let tax = document.getElementById("tax");
        let promotion = document.getElementById("promotion");
        let totale = document.getElementById("totale");
        let category = document.getElementById("category");
        let multiple = document.getElementById("multiple-prodect");
        let creatbtn = document.getElementById("creat");
        let searchbycategory = document.getElementById("searchbycategory");
        let searchbyname = document.getElementById("searchbyname");
        let table = document.getElementById("idtable");
        let deleteall = document.getElementById("deleteall");
        let mood=`creat`;
        let tmp;





        // FIRST FUNCTION GET TOTALE

        function gettotale(){
            if(price.value !='' && name.value !=''){
                 let t = (+price.value) + (+ads.value)  + ((+price.value)*(+tax.value)/100) - ((+price.value)*(+promotion.value)/100) ;
                 totale.innerHTML = t + ` $` ;
                 totale.className ='bg-primary p-1 ml-1 text-center'
            } else{
                totale.innerHTML = `totale :`
                totale.className ='bg-danger p-1 ml-1 text-center'

            }
           
        }
        gettotale()

        // creat a function if we click to a button creat the value in inputs clear

        function clearinputs(){
            name.value = '';
            price.value = '';
            ads.value = '';
            tax.value = '';
            promotion.value = '';
            totale.innerHTML = 'totale :'
            totale.className ='bg-danger p-1 ml-1 text-center'
            category.value ='';
            multiple.value ='';
        }
       


        // creat a prodect if we click to button creat

        let arrayprodect;

        if(localStorage.CRUDS != null){
            arrayprodect = JSON.parse(localStorage.CRUDS);

        } else{
            arrayprodect = [];
        }

        creatbtn.onclick = function(){
            // creat objet

            let newprodect = {
                name : name.value,
                price : price.value,
                ads : ads.value,
                promotion : promotion.value,
                tax : tax.value,
                category : category.value,
                multiple : multiple.value,
                totale : totale.innerHTML,

            }

           
            if(name.value !='' && price.value !='' && category.value !='' && multiple.value<100){ // validation 
                if(mood===`creat`){
                // creat a multiple prodect 
                if(newprodect.multiple>1){
                    for(let i=0;i< newprodect.multiple;i++ ){
                        arrayprodect.push(newprodect)
                    }

                } else{
                    arrayprodect.push(newprodect)
                }
                
            } else{
                arrayprodect[tmp]=newprodect;
                multiple.style.display ='block'; // hide a multiple case 
             creat.innerHTML=`creat`;
             mood =`creat`;
            }
             clearinputs()
            } else{
                alert("write the name prodect or price prodect and category  multiple must be lower to 100")
            }
            
            

            localStorage.setItem("CRUDS",JSON.stringify(arrayprodect))
           
             showdata()
        }

        // creat a function showdata in your page

        function showdata(){
            table ='';
            for(let i=0; i<arrayprodect.length;i++){
                table +=`
                
                <tr>
                    <td>${i+1}</td>
                    <td>${arrayprodect[i].category}</td>
                    <td>${arrayprodect[i].name}</td>
                    <td>${arrayprodect[i].price}</td>
                    <td>${arrayprodect[i].ads}</td>
                    <td>${arrayprodect[i].tax}</td>
                    <td>${arrayprodect[i].promotion} </td>
                    <td>${arrayprodect[i].totale} </td>
                       <td>
                        <button onclick="Update(${i})" class="btn btn-success mt-1 mb-1 " id="editprcprodect">Update</button>
                        </td>
                        <td>
                         <button onclick="deleteprodect(${i})" class="btn btn-danger mt-1 mb-1 " id="deletepricprodect">Delete</button>
                        </td>
                </tr>
                `;
            }
            document.getElementById("tbody").innerHTML = table ;

            if(arrayprodect.length>0){ // CREAT a button delete all 
                deleteall.innerHTML =`
                <button onclick="deleteAll()" type="button" class="btn btn-danger btn-lg btn-block" id="deleteall"> DELETE ALL (${arrayprodect.length}) </button>
                `;

            } else{
                deleteall.innerHTML ='';

            }

        }
        showdata()

          // creat function delete prodect
           function deleteprodect(i){
            if(confirm("are you sur you want delete this prodect ?") == true){
                arrayprodect.splice(i,1)
                localStorage.CRUDS = JSON.stringify(arrayprodect)

            } else{
                alert("the prodect is not delete")
            }
            showdata()
        }


        //creat a function deletall

        function deleteAll(){
            if(confirm("are you sur you want delete all prodect !!?") == true){
                 arrayprodect.splice(0)
            localStorage.clear()
            } else{
                alert("the all prodect is not delete")
            }
           
            showdata()
        }


        // creat function edit a prodect 

        function Update(i){
            name.value = arrayprodect[i].name;
            category.value = arrayprodect[i].category;
            price.value = arrayprodect[i].price;
            ads.value = arrayprodect[i].ads;
            tax.value = arrayprodect[i].tax;
            promotion.value = arrayprodect[i].promotion;
            gettotale() // update a totale case
            multiple.style.display ='none'; // hide a multiple case 
             creat.innerHTML=`Update`;// change mood creat to update 
             mood =`Update`;
             tmp = i;

             // creat a scroll in you click in a update

             scroll({
                top:0,
                behavior:'smooth'
             })

        }


        // creat a function search by name of prodect and show data 

        function searchbyName(value){
            table ='';
            for(let i=0 ; i<arrayprodect.length;i++){
                if(arrayprodect[i].name.toLowerCase().includes(value)){

                    table += `
                    
                    <tr>
                    <td>${i+1}</td>
                    <td>${arrayprodect[i].category}</td>
                    <td>${arrayprodect[i].name}</td>
                    <td>${arrayprodect[i].price}</td>
                    <td>${arrayprodect[i].ads}</td>
                    <td>${arrayprodect[i].tax}</td>
                    <td>${arrayprodect[i].promotion} </td>
                    <td>${arrayprodect[i].totale} </td>
                       <td>
                        <button onclick="Update(${i})" class="btn btn-success mt-1 mb-1 " id="editprcprodect">Update</button>
                        </td>
                        <td>
                         <button onclick="deleteprodect(${i})" class="btn btn-danger mt-1 mb-1 " id="deletepricprodect">Delete</button>
                        </td>
                </tr>
                    `;
                }
            }

            document.getElementById("tbody").innerHTML = table;
        }
       

          // creat a function search by category

          function searchbyCategory(value){
            table ='';
            for(let i=0 ; i<arrayprodect.length;i++){
                if(arrayprodect[i].category.toLowerCase().includes(value)){
                    
                    table += `
                    
                    <tr>
                    <td>${i+1}</td>
                    <td>${arrayprodect[i].category}</td>
                    <td>${arrayprodect[i].name}</td>
                    <td>${arrayprodect[i].price}</td>
                    <td>${arrayprodect[i].ads}</td>
                    <td>${arrayprodect[i].tax}</td>
                    <td>${arrayprodect[i].promotion} </td>
                    <td>${arrayprodect[i].totale} </td>
                       <td>
                        <button onclick="Update(${i})" class="btn btn-success mt-1 mb-1 " id="editprcprodect">Update</button>
                        </td>
                        <td>
                         <button onclick="deleteprodect(${i})" class="btn btn-danger mt-1 mb-1 " id="deletepricprodect">Delete</button>
                        </td>
                </tr>
                    `;
                }
            }

            document.getElementById("tbody").innerHTML = table;
        }
       

        



    
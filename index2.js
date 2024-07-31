let cardDiv=document.querySelector(".cards")
let addForm=document.querySelector(".add-form")
let nameInp=document.querySelector(".nameInp")
let descInp=document.querySelector(".descInp")
let BaseUrl="mongodb+srv://jafarag:rDnsjCQAyMExTRS3@jafaraglab.ybyb3nq.mongodb.net/jafaraglab"


async function GetDatas() {
    let datas = await axios.get(BaseUrl)
    try{
        // console.log(datas.data)
        CreateCards(datas.data)
    }catch(err){
        console.log(err)
    }
}

function CreateCards(datas){
    cardDiv.innerHTML=""
   datas.forEach(data => {
      cardDiv.innerHTML+=`
      <div class="card">
      <div class="card-top">
          <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="">
      </div>
      <div class="card-bottom">
          <h3>${data.name}</h3>
          <span>${data.description}</span>
          <button  data-id=${data.id} class="deleteBtn">Delete</button>
      </div>
  </div>
      
      
      `
      let deleteBtns=document.querySelectorAll(".deleteBtn")
      deleteBtns.forEach(deleteBtn=>{
         deleteBtn.addEventListener("click", async function(){
            let id = deleteBtn.getAttribute("data-id")
            await axios.delete(`${BaseUrl}/${id}`)
            GetDatas()
         })
      })

   });
}


addForm.addEventListener("submit", async function(event){
    event.preventDefault()
    let newCategory={
        name:nameInp.value,
        description:descInp.value
    }
    await axios.post(`${BaseUrl}`,newCategory)
    nameInp.value=""
    descInp.value=""
    GetDatas()
})








GetDatas()
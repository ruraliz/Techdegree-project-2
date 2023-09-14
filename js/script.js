/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const studentsPerPage= 9
function showPage (list, page){
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = (page * studentsPerPage) -1;
   const studentList= document.querySelector(".student-list")
   studentList.innerHTML= '';
   if(list.length === 0){
      let noResult= `
            <p class="no-results">No results found matching your search</p>
      `;
      const printNoResult = document.createElement("div")
      printNoResult.innerHTML= noResult
      studentList.insertAdjacentElement("beforeend", printNoResult )
      }else {
         for (let i=0; i< list.length; i++){
            if(i>= startIndex && i<= endIndex){
             const html= `
                  <li class="student-item cf">
                     <div class="student-details">
                        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                        <h3>${list[i].name.first} ${list[i].name.last}</h3>    
                        <span class="email">${list[i].email}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">Joined ${list[i].registered.date}</span>
                     </div>
                  </li>
               `;
               const printStudents = document.createElement("div")
               printStudents.innerHTML= html
               studentList.insertAdjacentElement("beforeend", printStudents);   
            }
         }    
   }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   const numberOfButtons= Math.ceil(list.length / studentsPerPage)
   const linkList= document.querySelector(".link-list")
   linkList.innerHTML= '';
   for(let i=1; i<= numberOfButtons; i++ ){
      const html= `
      <li> 
          <button type= "button">${i}</button>
      </li>
    `;
      linkList.insertAdjacentHTML("beforeend", html);    
   }
   linkList.querySelector("BUTTON").classList.add("active");
   linkList.addEventListener('click', (e) => {
   const activeButton= linkList.querySelector(".active")
   const clickedButton= e.target.closest("button")
      if(clickedButton) {
         activeButton.classList.remove("active");
         clickedButton.classList.add("active")
         showPage(data, clickedButton.innerHTML);
      }
   })
}

// Call functions
showPage(data, 1);
addPagination(data);

let studentData= data;
const header= document.querySelector(".header")
const search= `
<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button" class= "submit"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;    
header.insertAdjacentHTML("beforeend", search) 
const searchBar= document.getElementById("search")
const searchButton= document.querySelector('button.submit')
searchBar.addEventListener('keyup', () => {
   const searchInput= searchBar.value.toUpperCase();
   searchButton.onclick= () => {
      searchBar.value= '';
   }
   const studentListFiltered= data.filter(function (students){
      return (students.name.first.toUpperCase().includes(searchInput) || students.name.last.toUpperCase().includes(searchInput))
   });
   studentData= studentListFiltered
   showPage(studentData, 1);
   addPagination(studentData);
})

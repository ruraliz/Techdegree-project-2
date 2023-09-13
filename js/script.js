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
   const endIndex = (page * studentsPerPage)
   const studentList= document.querySelector(".student-list")
   studentList.innerHTML= '';
   for (let i=1; i<list.length; i++){
      if(i>= startIndex && i<+ endIndex){
         html= `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.thumbnail}" alt="Photo of ${list[i].first}">
           <h3>${list[i].first} + ${list[i].lastname}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">"Joined ${list[i].date}"</span>
         </div>
       </li>
         `;
         studentList.insertAdjacentElement("beforeend", html)
      } 
   }

}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
